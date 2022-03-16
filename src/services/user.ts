import mongoose from 'mongoose'

import { NotFoundError } from '../helpers/apiError'
import User, { UserDocument } from '../models/User'
import Event, { EventDocument } from '../models/Event'

//POST
const create = async (user: UserDocument): Promise<UserDocument> => {
  return await user.save()
}

//GET all users
const findAllUsers = async () => {
  return await User.find()
    .sort({ lastName: 1, firstName: 1 })
    .populate({
      path: 'cart',
      select: {
        eventName: 1,
        eventDateTime: 1,
        eventLoc: 1,
        contributionAmt: 1,
        contributionCurrency: 1,
      },
    })
}

//GET one user by Id
const findUserById = async (userId: string) => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User with Id ${userId} not found`)
  }

  return foundUser
}

//find user by email
const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  return await User.findOne({ email })
}

//UPDATE user by ID
const updateUserById = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User Id ${userId} not found`)
  }

  return foundUser
}

//DELETE user by ID
const deleteUserById = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User with ID ${userId} not found`)
  }

  return foundUser
}

//add event to user's cart
const patchEventToCart = async (
  userId: string,
  eventId: string
): Promise<UserDocument> => {
  const user = await User.findById(userId)
  if (!user) {
    throw new NotFoundError(`User with ID ${userId} not found`)
  }

  const event = await Event.findById(eventId)
  if (!event) {
    throw new NotFoundError(`Event with ID ${eventId} not found`)
  }

  user.cart.push(mongoose.Types.ObjectId(eventId))
  return await user.save()
}

//add event to user's list of eventsAsOrganizer
const patchEventToEventsAsOrganizer = async (
  userId: string,
  eventId: string
): Promise<UserDocument> => {
  const user = await User.findById(userId)
  if (!user) {
    throw new NotFoundError(`User with ID ${userId} not found`)
  }

  const event = await Event.findById(eventId)
  if (!event) {
    throw new NotFoundError(`Event with ID ${eventId} not found`)
  }

  user.eventsAsOrganizer.push(mongoose.Types.ObjectId(eventId))
  return await user.save()
}

//add event to user's list of eventsAsAttendee
const patchEventToEventsAsAttendee = async (
  userId: string,
  eventId: string
): Promise<UserDocument> => {
  const user = await User.findById(userId)
  if (!user) {
    throw new NotFoundError(`User with ID ${userId} not found`)
  }

  const event = await Event.findById(eventId)
  if (!event) {
    throw new NotFoundError(`Event with ID ${eventId} not found`)
  }

  user.eventsAsAttendee.push(mongoose.Types.ObjectId(eventId))
  return await user.save()
}

export default {
  create,
  findAllUsers,
  findUserById,
  findUserByEmail,
  updateUserById,
  deleteUserById,
  patchEventToCart,
  patchEventToEventsAsOrganizer,
  patchEventToEventsAsAttendee,
}
