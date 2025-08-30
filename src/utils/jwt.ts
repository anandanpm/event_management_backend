import jwt from 'jsonwebtoken';

export const signToken = (payload: { id: string; role: string }): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });
};

export const verifyToken = (token: string): { id: string; role: string } => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
};