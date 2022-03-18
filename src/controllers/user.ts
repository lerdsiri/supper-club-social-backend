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
      username,
      email,
      firstName,
      lastName,
      profilePic,
      isAdmin,
      isBanned,
      location,
    } = req.body

    if (await UserService.findUserByEmail(email)) {
      return res.status(400).json('error: User already exists')
    }

    const user = new User({
      username,
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
