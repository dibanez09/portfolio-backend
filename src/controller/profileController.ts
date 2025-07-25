import { createToken, decodeToken } from '../helpers/jwtHelper';
import JwtPayload from 'jsonwebtoken';
import mongoose from 'mongoose';

//types
import { NextFunction, Request, Response } from 'express';

// models
import { User } from '../models';

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'user not found' })
      return
    }
    const user = await User.find({ id })

    if (!user) {
      res.status(404).json({ error: 'user not found' })
      return
    }

    res.status(200).json(user)
    return
  } catch (error: any) {
    next({
      message: 'Internal server error',
      details: error?.message,
      code: 500,
    });
  }
};