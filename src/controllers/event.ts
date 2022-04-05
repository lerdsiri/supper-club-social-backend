import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

import Event from '../models/Event'
//import Review from '../models/Event'
import EventService from '../services/event'
import { BadRequestError } from '../helpers/apiError'

// POST
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      eventName,
      eventDateTime,
      eventLoc,
      cuisine,
      description,
      responseDateline,
      contributionAmt,
      contributionCurrency,
      numOfAttendeesAllowed
    } = req.body

    if (await EventService.findEventByName(eventName)) {
      return res.status(400).json('error: The same event name has been taken')
    }

    const event = new Event({
      eventName,
      eventDateTime,
      eventLoc,
      cuisine,
      description,
      responseDateline,
      contributionAmt,
      contributionCurrency,
      numOfAttendeesAllowed
    })

    res.json(await EventService.create(event))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET all events
export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await EventService.findAllEvents())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET event by Id
export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await EventService.findEventById(req.params.eventId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET events by city
export const getEventsByCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await EventService.findEventsByCity(req.params.city))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET events by postal code
export const getEventsByPostCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await EventService.findEventsByPostCode(req.params.postCode))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// UPDATE event by Id
export const editEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await EventService.updateEventById(req.params.eventId, req.body))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE event by Id
export const removeEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await EventService.deleteEventById(req.params.eventId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// add review to event
export const addReviewToEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = req.params.eventId
    const { reviewer, content, score } = req.body
    const review = {
      reviewer: mongoose.Types.ObjectId(reviewer),
      content: content,
      score: score,
    }
    res.json(await EventService.patchReviewToEvent(eventId, review))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
