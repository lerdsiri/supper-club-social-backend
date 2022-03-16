// Suspended... not in use for the moment

import { Request, Response, NextFunction } from 'express'

import Conversation from '../models/Conversation'
import ConversationService from '../services/conversation'
import { BadRequestError } from '../helpers/apiError'

//POST
export const createConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { creator, participants, subject, event, messages } = req.body

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
