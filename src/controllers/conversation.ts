import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

import Conversation from '../models/Conversation'
import ConversationService from '../services/conversation'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

//POST
export const createConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { creator, participants, subject, event, messages } = req.body
    messages[0].messageDateTime = new Date(Date.now())

    const conversation = new Conversation({
      creator,
      participants,
      subject,
      event,
      messages,
    })

    res.json(await ConversationService.create(conversation))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET all conversations
export const getAllConversations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ConversationService.findAllConversations())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET conversation by Id
export const getConversationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(
      await ConversationService.findConversationById(req.params.conversationId)
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET all conversations in which a given userId is a participant
export const getConversationsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(
      await ConversationService.findConversationsByUserId(req.params.userId)
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET all conversations related to an event Id
export const getConversationsByEventId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(
      await ConversationService.findConversationsByEventId(req.params.eventId)
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// UPDATE conversation by editing an existing message
export const editMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const convoId = req.params.conversationId
    const userId = req.params.userId
    const messageId = req.params.messageId
    const editedContent = req.body.content
    res.json(
      await ConversationService.updateMessage(
        convoId,
        userId,
        messageId,
        editedContent
      )
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// UPDATE conversation by adding a new message
export const addMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const convoId = req.params.conversationId
    const author = req.params.userId
    const content = req.body.content
    const messageDateTime = new Date(Date.now())

    const message = {
      author: mongoose.Types.ObjectId(author),
      content: content,
      messageDateTime: messageDateTime,
    }

    res.json(await ConversationService.patchMessage(convoId, message))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE conversation by Id
export const removeConversationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(
      await ConversationService.deleteConversationById(
        req.params.conversationId
      )
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
