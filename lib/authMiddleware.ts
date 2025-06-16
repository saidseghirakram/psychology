import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// Extend NextApiRequest to include user
interface AuthenticatedRequest extends NextApiRequest {
  user?: string | jwt.JwtPayload;
}

export async function requireAuth(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ success: false, error: 'No token provided' });
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach user info to req (with type safety)
    (req as AuthenticatedRequest).user = decoded;
    return decoded;
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
    return null;
  }
}