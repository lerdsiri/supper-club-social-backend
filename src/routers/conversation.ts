import express from 'express'
import passport from 'passport'

import {
  addMessage,
  createConversation,
  editMessage,
  getAllConversations,
  getConversationById,
  getConversationsByEventId,
  //getConversationsByUserId,
  removeConversationById,
} from '../controllers/conversation'

const router = express.Router()

// create conversation
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createConversation
)

// retrieve all conversations
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getAllConversations
)

// retrieve conversation by id
router.get(
  '/:conversationId',
  passport.authenticate('jwt', { session: false }),
  getConversationById
)

// retrieve all conversations in which a given user Id is a participant
// temporarily removed as conversations are currently limited to
// message board attached to each event and users organzing or attending
// such an event are automatically part of that message board.
/*
router.get(
  '/participants/:userId',
  passport.authenticate('jwt', { session: false }),
  getConversationsByUserId
)
*/

// retrieve all conversations related an event Id
router.get(
  '/events/:eventId',
  passport.authenticate('jwt', { session: false }),
  getConversationsByEventId
)

// update conversation by editing an existing message
router.put(
  '/:conversationId/messages/:messageId',
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
