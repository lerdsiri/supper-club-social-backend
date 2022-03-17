import { NotFoundError } from '../helpers/apiError'
import Conversation, {
  ConversationDocument,
  Message,
} from '../models/Conversation'

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

// GET all conversations in which a given user Id is a participant
const findConversationsByUserId = async (
  userId: string
): Promise<ConversationDocument[] | null> => {
  const allConvos = await Conversation.find()
    .populate({
      path: 'participants',
      select: { username: 1 },
    })
    .populate({
      path: 'creator',
      select: { username: 1 },
    })
    .populate({
      path: 'event',
      select: { eventName: 1, eventDateTime: 1, eventLoc: 1 },
    })
    .populate({
      path: 'messages.author',
      select: { username: 1 },
    })

  const foundConvos = allConvos.filter((convo) => {
    return convo.participants.some(
      (participant) => participant._id.toString() == userId
    )
  })

  if (foundConvos.length === 0) {
    throw new NotFoundError(
      `There are no conversations in which user ID ${userId} is involved.`
    )
  }

  return foundConvos
}

// GET all conversations related to an event Id
const findConversationsByEventId = async (
  eventId: string
): Promise<ConversationDocument[] | null> => {
  const allConvos = await Conversation.find()
    .populate({
      path: 'participants',
      select: { username: 1 },
    })
    .populate({
      path: 'creator',
      select: { username: 1 },
    })
    .populate({
      path: 'event',
      select: { eventName: 1, eventDateTime: 1, eventLoc: 1 },
    })
    .populate({
      path: 'messages.author',
      select: { username: 1 },
    })

  const foundConvos = allConvos.filter((convo) => {
    return convo.event._id.toString() === eventId
  })

  if (foundConvos.length === 0) {
    throw new NotFoundError(
      `There are no conversations related to event Id ${eventId}`
    )
  }

  return foundConvos
}

// UPDATE conversation by editing an existing message
const updateMessage = async (
  conversationId: string,
  messageId: string,
  update: string
): Promise<ConversationDocument | null> => {
  const editedConversation = await Conversation.updateOne(
    {
      _id: conversationId,
      'messages._id': messageId,
    },
    {
      $set: {
        'messages.$.content': update,
        'messages.$.messageDateTime': new Date(Date.now()),
      },
    },
    {
      new: true,
    }
  )

  return await Conversation.findById(conversationId)
}

// UPDATE conversation by adding a new message
const patchMessage = async (
  conversationId: string,
  message: Message
): Promise<ConversationDocument | null> => {
  const convo = await Conversation.findById(conversationId)

  if (!convo) {
    throw new NotFoundError(
      `Message cannot be added. Conversation with id ${conversationId} does not exist.`
    )
  }

  convo.messages.push(message)
  return await convo.save()
}

export default {
  create,
  findAllConversations,
  findConversationById,
  findConversationsByUserId,
  findConversationsByEventId,
  updateMessage,
  patchMessage,
}
