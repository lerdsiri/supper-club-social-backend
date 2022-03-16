import express from 'express'
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  addEventToCart,
  addEventToEventsAsOrganizer,
  addEventToEventsAsAttendee,
} from '../controllers/user'

const router = express.Router()

//create user
router.post('/', createUser)

//retrieve all users
router.get('/', getAllUsers)

//retrieve one user by Id
router.get('/:userId', getOneUser)

//update one user by Id
router.put('/:userId', updateUser)

//delete user by Id
router.delete('/:userId', deleteUser)

//add event to user's cart
router.patch('/:userId/cart/:eventId', addEventToCart)

//add event to user's list of eventsAsOrganizer
router.patch('/:userId/eventsAsOrganizer/:eventId', addEventToEventsAsOrganizer)

//add event to user's list of eventsAsAttendee
router.patch('/:userId/eventsAsAttendee/:eventId', addEventToEventsAsAttendee)

export default router
