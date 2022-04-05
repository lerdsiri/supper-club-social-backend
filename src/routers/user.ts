import express from 'express'
import passport from 'passport'

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
  loginUser,
  uploadProfileImg,
} from '../controllers/user'

const router = express.Router()

//create user
router.post('/', createUser)
router.post('/login', loginUser)
router.post('/uploadprofileimg/:userId', passport.authenticate('jwt', { session: false }), uploadProfileImg)

//retrieve all users
router.get('/', passport.authenticate('jwt', { session: false }), getAllUsers)
//retrieve one user by Id
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  getOneUser
)

//update one user by Id
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  updateUser
)
//update list of unread convos by removing read convo
router.put(
  '/:userId/unreadConversations/:conversationId',
  passport.authenticate('jwt', { session: false }),
  reviseUnreadConversations
)
//update user's cart by removing event
router.put(
  '/:userId/cart/events/:eventId',
  passport.authenticate('jwt', { session: false }),
  removeEventFromCart
)
//update user's list of eventsAsOrganizer by removing event
router.put(
  '/:userId/eventsAsOrganizer/events/:eventId',
  passport.authenticate('jwt', { session: false }),
  removeEventFromEventsAsOrganizer
)
//update user's list of eventsAsAttendee by removing event
router.put(
  '/:userId/eventsAsAttendee/events/:eventId',
  passport.authenticate('jwt', { session: false }),
  removeEventFromEventsAsAttendee
)

//delete user by Id
router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  deleteUser
)

//add event to user's cart
router.patch(
  '/:userId/cart/events/:eventId',
  passport.authenticate('jwt', { session: false }),
  addEventToCart
)
//add event to user's list of eventsAsOrganizer
router.patch(
  '/:userId/eventsAsOrganizer/events/:eventId',
  passport.authenticate('jwt', { session: false }),
  addEventToEventsAsOrganizer
)
//add event to user's list of eventsAsAttendee
router.patch(
  '/:userId/eventsAsAttendee/events/:eventId',
  passport.authenticate('jwt', { session: false }),
  addEventToEventsAsAttendee
)

export default router
