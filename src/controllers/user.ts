import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'

// POST
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      firstName,
      lastName,
      profilePic,
      isAdmin,
      isBanned,
      location,
    } = req.body
    const user = new User({
      email,
      firstName,
      lastName,
      profilePic,
      isAdmin,
      isBanned,
      location,
    })
    res.json(await UserService.create(user))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAllUsers())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
