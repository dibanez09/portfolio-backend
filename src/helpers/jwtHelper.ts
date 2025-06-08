import jwt from 'jsonwebtoken';
import { IUserData } from '../types/types';

const jwtSecret = process.env.SECRET_KEY || '';
const tokenExpiry = process.env.TOKEN_EXPIRY || '';
export const createToken = (userData: IUserData) => {
  return jwt.sign(userData, jwtSecret, {
    expiresIn: tokenExpiry,
  } as jwt.SignOptions);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw {
      description: 'Invalid token',
    };
  }
};

export const decodeToken = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw {
      description: 'Invalid token',
    };
  }
};
