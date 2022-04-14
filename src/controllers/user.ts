import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import UserService from '../services/user'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'
import { cloudinary } from '../util/cloudinary'

// POST - create user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      isAdmin,
      isBanned,
      location,
    } = req.body

    if (await UserService.findUserByEmail(email)) {
      return res.status(400).json('error: User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    location.city = location.city.toLowerCase()
    location.country = location.country.toLowerCase()

    const user = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin,
      isBanned,
      location,
    })

    res.json(await UserService.create(user))
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST - login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await UserService.findUserByEmail(email)

    if (!user) {
      return next(new NotFoundError('User\'s email not found'))
    } else {
      {
        const isCorrectPassword = await bcrypt.compare(password, user.password)

        if (!isCorrectPassword) {
          return next(new BadRequestError('Password is incorrect'))
        }

        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            isBanned: user.isBanned,
          },
          JWT_SECRET,
          {
            expiresIn: '12h',
          }
        )

        const userLessPassword = await User.findOne(
          { email: email },
          { password: 0 }
        )

        res.json({ token, userLessPassword })
      }
    }
  } catch (error) {
    next(new InternalServerError('Internal server error'))
  }
}

// POST profile pic to existing profile
export const uploadProfileImg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId

    const fileStr = req.body.profileImg
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      uploadPreset: 'dev_setups',
    })
    const update = { profilePic: uploadedResponse.url }

    res.json(await UserService.updateUserById(userId, update))
  } catch (error) {
    console.log('From controller: ', error)
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

// GET one user by Id
export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findUserById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT - update user by Id
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.updateUserById(req.params.userId, req.body))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT - update user's list of unread convos by removing read convo
export const reviseUnreadConversations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId
  const conversationId = req.params.conversationId

  try {
    res.json(
      await UserService.updateUnreadConversations(userId, conversationId)
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT - update user's cart by removing event from cart
export const removeEventFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId
  const eventId = req.params.eventId

  try {
    res.json(await UserService.deleteEventFromCart(userId, eventId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT - update user's list of eventsAsOrganizer by removing event
export const removeEventFromEventsAsOrganizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId
  const eventId = req.params.eventId

  try {
    res.json(
      await UserService.deleteEventFromEventsAsOrganizer(userId, eventId)
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT - update user's list of eventsAsAttendee by removing event
export const removeEventFromEventsAsAttendee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId
  const eventId = req.params.eventId

  try {
    res.json(await UserService.deleteEventFromEventsAsAttendee(userId, eventId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE user by Id
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.deleteUserById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// add event to user's cart
export const addEventToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const eventId = req.params.eventId
    res.json(await UserService.patchEventToCart(userId, eventId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// add event to user's list of eventsAsOrganizer
export const addEventToEventsAsOrganizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const eventId = req.params.eventId
    res.json(await UserService.patchEventToEventsAsOrganizer(userId, eventId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// add event to user's list of eventsAsAttendee
export const addEventToEventsAsAttendee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const eventId = req.params.eventId
    res.json(await UserService.patchEventToEventsAsAttendee(userId, eventId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
