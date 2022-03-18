import express from 'express'
import { remove } from 'lodash'
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  addEventToCart,
  addEventToEventsAsOrganizer,
  addEventToEventsAsAttendee,
  reviseUnreadConversations,
  removeEventFromCart,
  removeEventFromEventsAsOrganizer,
  removeEventFromEventsAsAttendee,
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
//update list of unread convos by removing read convo
router.put(
  '/:userId/unreadConversations/:conversationId',
  reviseUnreadConversations
)
//update user's cart by removing event
router.put('/:userId/cart/events/:eventId', removeEventFromCart)
//update user's list of eventsAsOrganizer by removing event
router.put(
  '/:userId/eventsAsOrganizer/events/:eventId',
  removeEventFromEventsAsOrganizer
)
//update user's list of eventsAsAttendee by removing event
router.put(
  '/:userId/eventsAsAttendee/events/:eventId',
  removeEventFromEventsAsAttendee
)

//delete user by Id
router.delete('/:userId', deleteUser)

//add event to user's cart
router.patch('/:userId/cart/events/:eventId', addEventToCart)
//add event to user's list of eventsAsOrganizer
router.patch(
  '/:userId/eventsAsOrganizer/events/:eventId',
  addEventToEventsAsOrganizer
)
//add event to user's list of eventsAsAttendee
router.patch(
  '/:userId/eventsAsAttendee/events/:eventId',
  addEventToEventsAsAttendee
)

export default router
