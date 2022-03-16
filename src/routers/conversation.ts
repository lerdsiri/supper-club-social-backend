// Suspended... not in use for the moment

import express from 'express'
import {
  createConversation,
  getAllConversations,
  getConversationById,
  getConversationsByUserId,
} from '../controllers/conversation'

const router = express.Router()

// create conversation
router.post('/', createConversation)

// retrieve
router.get('/', getAllConversations)
router.get('/:conversationId', getConversationById)
// retrieve all conversations in which a given user Id is a participant
router.get('/participants/:userId', getConversationsByUserId)

export default router
