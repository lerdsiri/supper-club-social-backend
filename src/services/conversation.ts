// Suspended... not in use for the moment

import mongoose from 'mongoose'

import { NotFoundError } from '../helpers/apiError'
import Conversation, { ConversationDocument } from '../models/Conversation'

//POST
const create = async (
  conversation: ConversationDocument
): Promise<ConversationDocument> => {
  return await conversation.save()
}

//GET all conversations
const findAllConversations = async () => {
  return await Conversation.find()
    .sort({ updatedAt: 1 })
    .populate({
      path: 'creator',
      select: { firstName: 1, lastName: 1, email: 1 },
    })
    .populate({
      path: 'participants',
      select: { firstName: 1, lastName: 1, email: 1 },
    })
    .populate({
      path: 'event',
      select: {
        eventName: 1,
        eventDateTime: 1,
        eventLoc: 1,
      },
    })
}

// GET conversation by Id
const findConversationById = async (
  conversationId: string
): Promise<ConversationDocument | null> => {
  const foundConversation = await Conversation.findById(conversationId)

  if (!foundConversation) {
    throw new NotFoundError(`Conversation Id ${conversationId} not found`)
  }

  return foundConversation
}

// ************
// The method below does not work
// Can't do this in Mongo?: Looking up a model in one collection based on
// attributes of models it references in another collection.

// GET all conversations in which a given user Id is a participant
const findConversationsByUserId = async (
  userId: string
): Promise<ConversationDocument[] | null> => {
  const foundConversations = await Conversation.find({
    'participants._id': userId,
  })

  if (foundConversations.length === 0) {
    throw new NotFoundError(
      `There are no conversations in which user ID ${userId} is involved.`
    )
  }

  return foundConversations
}

export default {
  create,
  findAllConversations,
  findConversationById,
  findConversationsByUserId,
}
