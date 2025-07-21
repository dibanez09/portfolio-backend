import { createToken, decodeToken } from '../helpers/jwtHelper';
import JwtPayload from 'jsonwebtoken';
import mongoose from 'mongoose';

//types
import { NextFunction, Request, Response } from 'express';

// models
import { User } from '../models';

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
    // const users = await User.find({}).sort({ createdAt: -1 })

    const users = await User.find().populate('contactId').populate('profileId').populate('addressId')

    res.status(200).json({
      data: users
    })
  } catch (error: any) {
    console.log(error)
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