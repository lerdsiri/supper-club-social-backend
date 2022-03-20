import express from 'express'
import passport from 'passport'

import {
  addMessage,
  createConversation,
  editMessage,
  getAllConversations,
  getConversationById,
  getConversationsByEventId,
  getConversationsByUserId,
  removeConversationById,
} from '../controllers/conversation'

const router = express.Router()

// create conversation
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createConversation
)

// retrieve
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getAllConversations
)
router.get(
  '/:conversationId',
  passport.authenticate('jwt', { session: false }),
  getConversationById
)
// retrieve all conversations in which a given user Id is a participant
router.get(
  '/participants/:userId',
  passport.authenticate('jwt', { session: false }),
  getConversationsByUserId
)
// retrieve all conversations related an event Id
router.get(
  '/events/:eventId',
  passport.authenticate('jwt', { session: false }),
  getConversationsByEventId
)

// update conversation by editing an existing message
router.put(
  '/:conversationId/users/:userId/messages/:messageId',
  passport.authenticate('jwt', { session: false }),
  editMessage
)
// update conversation by adding a new message
router.put(
  '/:conversationId/users/:userId',
  passport.authenticate('jwt', { session: false }),
  addMessage
)

// delete conversation by id
router.delete(
  '/:conversationId',
  passport.authenticate('jwt', { session: false }),
  removeConversationById
)

export default router
