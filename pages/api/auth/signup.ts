import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { handleApiError } from '@/lib/errorHandler';
import bcrypt from 'bcrypt';

const INTERNAL_EMAIL = process.env.SUPABASE_EMAIL;
const INTERNAL_PASSWORD = process.env.SUPABASE_PASSWORD;

// Define a common base and specialized types
type BaseUser = {
  fullName: string;
  email: string;
  password: string;
};

type DoctorInsertData = BaseUser;

type PatientInsertData = BaseUser & {
  age: number;
  gender: string;
  patientType: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  let internalEmail = INTERNAL_EMAIL;
  let internalPassword = INTERNAL_PASSWORD;

  if ((!internalEmail || !internalPassword) && req) {
    internalEmail = req.headers['x-supabase-email'] as string | undefined;
    internalPassword = req.headers['x-supabase-password'] as string | undefined;
  }

  if (!internalEmail || !internalPassword) {
    return handleApiError(res, 'Missing internal credentials', 401);
  }

  if (
    req.headers['x-supabase-email'] !== internalEmail ||
    req.headers['x-supabase-password'] !== internalPassword
  ) {
    return handleApiError(res, 'Unauthorized: Invalid internal credentials', 401);
  }

  const { fullName, email, password, type, age, gender, patientType } = req.body;

  if (!fullName || !email || !password || !type) {
    return handleApiError(res, 'fullName, email, password, and type are required', 400);
  }

  const trimmedEmail = email.trim().toLowerCase();

  let tableName = '';
  let insertData: DoctorInsertData | PatientInsertData = {
    fullName,
    email: trimmedEmail,
    password: await bcrypt.hash(password, 10),
  };

  if (type === 'doctor') {
    tableName = 'doctors';
  } else if (type === 'patient') {
    tableName = 'patients';

    if (age === undefined || gender === undefined || patientType === undefined) {
      return handleApiError(res, 'age, gender, and patientType are required for patient', 400);
    }

    insertData = {
      ...insertData,
      age,
      gender,
      patientType,
    } as PatientInsertData;
  } else {
    return handleApiError(res, 'Invalid type. Must be doctor or patient.', 400);
  }

  const { data, error } = await supabaseAdmin
    .from(tableName)
    .insert([insertData])
    .select()
    .single();

  if (error) return handleApiError(res, error);

  return res.status(201).json({
    message: `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully`,
    [type]: data,
  });
}
