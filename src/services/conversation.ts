//import { lte } from 'lodash'
import { NotFoundError } from '../helpers/apiError'

import Conversation, {
  ConversationDocument,
  Message,
} from '../models/Conversation'

//POST
const create = async (
  conversation: ConversationDocument
): Promise<ConversationDocument> => {
  const newConvo = await conversation.save()

  // add conversation to receiver's list of unread conversations
  // Suspended until direct message feature is permitted.
  /*
  newConvo.participants.map(async (participant) => {
    if (participant.toString() != newConvo.creator.toString()) {
      const receiver = await User.findById(participant)
      receiver?.unreadConversations.push(newConvo._id)
      await receiver?.save()
    }
  })
  */

  return newConvo
}

/*
event.reviews.push(review)
return await event.save()
*/

//GET all conversations
const findAllConversations = async () => {
  return await Conversation.find()
    .sort({ updatedAt: 1 })
    .populate({
      path: 'messages',
      populate: {
        path: 'author',
        select: { username: 1, profilePic: 1 },
      },
    })

  /*
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
  */
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
// Temporarily suspended as conversations are currently limited
// to message board attached to each event. Users organzing or attending
// such an event are automatically part of the message board.
/*
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
*/

// GET all conversations related to an event Id
const findConversationsByEventId = async (
  eventId: string
): Promise<ConversationDocument[] | null> => {
  const allConvos = await Conversation.find()

  const foundConvo = allConvos.filter((convo) => {
    return convo.event.toString() === eventId
  })

  return foundConvo
  /* 
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
  */
}

// UPDATE conversation by editing an existing message
const updateMessage = async (
  conversationId: string,
  messageId: string,
  update: string
): Promise<ConversationDocument | null> => {
  const updateResult = await Conversation.updateOne(
    {
      _id: conversationId,
      'messages._id': messageId,
    },
    {
      $set: {
        'messages.$.content': update,
      },
    },
    {
      new: true,
    }
  )

  const updatedConvo = await Conversation.findById(conversationId)

  // add conversation to receivers' list of unread conversations
  // Suspended.
  /*
  updatedConvo?.participants.map(async (participant) => {
    if (participant.toString() != userId) {
      const receiver = await User.findById(participant)

      if (
        !receiver?.unreadConversations.some(
          (unreadConvo) =>
            unreadConvo.toString() === updatedConvo._id.toString()
        )
      ) {
        receiver?.unreadConversations.push(updatedConvo._id)
        await receiver?.save()
      }
    }
  })
  */

  return updatedConvo
}

// UPDATE conversation by adding a new message
const addNewMessage = async (
  conversationId: string,
  message: Message
): Promise<ConversationDocument | null> => {
  const convo = await Conversation.findById(conversationId)

  if (!convo) {
    throw new NotFoundError(
      `Message cannot be added. Conversation with id ${conversationId} does not exist.`
    )
  }

  convo.messages.unshift(message)
  const updatedConvo = (await convo.save()).populate({
    path: 'messages',
    populate: {
      path: 'author',
      select: { username: 1, profilePic: 1 },
    },
  })

  /*
  updatedConvo = updatedConvo.populate({
    path: 'messages',
    populate: {
      path: 'author',
      select: { username: 1, profilePic: 1}
    }
  })
  */

  // add conversation to receivers' list of unread conversations
  // suspended
  /*
  updatedConvo.participants.map(async (participant) => {
    if (participant.toString() !== message.author.toString()) {
      const receiver = await User.findById(participant)

      if (
        !receiver?.unreadConversations.some(
          (unreadConvo) =>
            unreadConvo.toString() === updatedConvo._id.toString()
        )
      ) {
        receiver?.unreadConversations.push(updatedConvo._id)
        await receiver?.save()
      }
    }
  })
  */

  return updatedConvo
}

// DELETE conversation by Id
const deleteConversationById = async (
  conversationId: string
): Promise<ConversationDocument | null> => {
  const convoToDelete = Conversation.findByIdAndDelete(conversationId)

  if (!convoToDelete) {
    throw new NotFoundError(`Conversation with id ${conversationId} not found`)
  }

  return convoToDelete
}

export default {
  create,
  findAllConversations,
  findConversationById,
  findConversationsByEventId,
  updateMessage,
  addNewMessage,
  deleteConversationById,
}

/*
export default {
  create,
  findAllConversations,
  findConversationById,
  findConversationsByUserId,
  findConversationsByEventId,
  updateMessage,
  patchMessage,
  deleteConversationById,
}
*/
