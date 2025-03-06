import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

export function generateToken(payload: any): string {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, jwtConfig.secret);
  } catch (error) {
    return null;
  }
}