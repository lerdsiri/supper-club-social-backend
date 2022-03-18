import express from 'express'

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
router.post('/', createConversation)

// retrieve
router.get('/', getAllConversations)
router.get('/:conversationId', getConversationById)
// retrieve all conversations in which a given user Id is a participant
router.get('/participants/:userId', getConversationsByUserId)
// retrieve all conversations related an event Id
router.get('/events/:eventId', getConversationsByEventId)

// update conversation by editing an existing message
router.put('/:conversationId/users/:userId/messages/:messageId', editMessage)
// update conversation by adding a new message
router.put('/:conversationId/users/:userId', addMessage)

// delete conversation by id
router.delete('/:conversationId', removeConversationById)

export default router
