import type { NextApiRequest, NextApiResponse } from "next";
import { supabase, SignIn } from "@/lib/supabaseClient";
import { console } from "inspector";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { fullName, email, password } = req.body;
    console.log(req.body);
    console.log(fullName);
    console.log(email);
    console.log(password);
    const { data, error } = await supabase
      .from("Doctors")
      .insert([{ fullName, email, password }]);

    if (error) return res.status(400).json({ error });
    return res
      .status(201)
      .json({ doctor: [data, { fullName, email, password }] });
  }

  /* get all Doctors */
  if (req.method === "GET") {
    const { data, error } = await supabase.from("Doctors").select("*");
    if (error) return res.status(400).json({ error });
    return res.status(200).json({ doctors: data });
  }

  return res.status(405).end();
}
