import { createToken, decodeToken } from '../helpers/jwtHelper';
import JwtPayload from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/userModel';
import { NextFunction, Request, Response } from 'express';
export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password })

    res.status(200).json(user)
  } catch (error: any) {
    next({
      message: 'Internal server error',
      details: error?.message,
      code: 500,
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.find({}).sort({ createdAt: -1 })

    res.status(200).json(user)
  } catch (error: any) {
    next({
      message: 'Internal server error',
      details: error?.message,
      code: 500,
    });
  }
};

export const getUser = async (
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

export const deleteUser = async (
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
    const user = await User.findByIdAndDelete({ _id: id })

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

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const { username, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'user not found' })
      return
    }

    const user = await User.findOneAndUpdate({ _id: id }, {
      username, password
    })

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