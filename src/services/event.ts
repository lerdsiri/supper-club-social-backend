import { ForbiddenError, NotFoundError } from '../helpers/apiError'
import Event, { EventDocument, Review } from '../models/Event'
import User from '../models/User'

//POST
const create = async (event: EventDocument): Promise<EventDocument> => {
  return await event.save()
}

//GET all events
const findAllEvents = async () => {
  return await Event.find().sort({ eventDateTime: 1 })
}

//GET all events in a city
const findEventsByCity = async (
  city: string
): Promise<EventDocument[] | null> => {
  const foundEvents = await Event.find({ 'eventLoc.city': city }).sort({
    eventDateTime: 1,
  })

  return foundEvents
}

//GET all events by postal code
const findEventsByPostCode = async (
  postCode: string
): Promise<EventDocument[] | null> => {
  const foundEvents = await Event.find({ 'eventLoc.postCode': postCode }).sort({
    eventDateTime: 1,
  })

  return foundEvents
}

//GET event by Id
const findEventById = async (
  eventId: string
): Promise<EventDocument | null> => {
  const foundEvent = await Event.findById(eventId)

  if (!foundEvent) {
    throw new NotFoundError(`Event with Id ${eventId} not found`)
  }

  return foundEvent
}

//find event by name
const findEventByName = async (
  eventName: string
): Promise<EventDocument | null> => {
  return await Event.findOne({ eventName })
}

// UPDATE event by Id
const updateEventById = async (
  eventId: string,
  update: Partial<EventDocument>
): Promise<EventDocument | null> => {
  const foundEvent = await Event.findByIdAndUpdate(eventId, update, {
    new: true,
    runValidators: true,
  })

  if (!foundEvent) {
    throw new NotFoundError(`Event with Id ${eventId} not found`)
  }

  return foundEvent
}

// DELETE event by Id
const deleteEventById = async (
  eventId: string
): Promise<EventDocument | null> => {
  const foundEvent = await Event.findByIdAndDelete(eventId)

  if (!foundEvent) {
    throw new NotFoundError(`Event with Id ${eventId} not found`)
  }

  return foundEvent
}

//add review to event
const patchReviewToEvent = async (
  eventId: string,
  review: Review
): Promise<EventDocument> => {
  const event = await Event.findById(eventId)
  //check that the event exists
  if (!event) {
    throw new NotFoundError(`Event with ID ${eventId} not found`)
  }

  //check that the event has taken place
  if (new Date(Date.now()) < event.eventDateTime) {
    throw new ForbiddenError(
      'User cannot review an event that has not taken place.'
    )
  }

  //check that reviewer attended the event
  const reviewer = await User.findById(review.reviewer)
  if (
    !reviewer?.eventsAsAttendee.some((event) => event.toString() == eventId)
  ) {
    throw new ForbiddenError(
      'User cannot review an event that user did not attend.'
    )
  }

  //check whether reviewer has already reviewed the event
  if (
    event.reviews.some(
      (existingReview) =>
        existingReview.reviewer.toString() == review.reviewer.toString()
    )
  ) {
    throw new ForbiddenError('User has already reviewed this event.')
  }

  event.reviews.push(review)
  return await event.save()
}

export default {
  create,
  findAllEvents,
  findEventsByCity,
  findEventsByPostCode,
  findEventById,
  findEventByName,
  updateEventById,
  deleteEventById,
  patchReviewToEvent,
}
