import { NotFoundError } from '../helpers/apiError'
import Event, { EventDocument, Review } from '../models/Event'

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

  if (foundEvents.length === 0) {
    throw new NotFoundError(`There are no events in ${city} at the moment`)
  }

  return foundEvents
}

//GET all events by postal code
const findEventsByPostCode = async (
  postCode: string
): Promise<EventDocument[] | null> => {
  const foundEvents = await Event.find({ 'eventLoc.postCode': postCode }).sort({
    eventDateTime: 1,
  })

  if (foundEvents.length === 0) {
    throw new NotFoundError(
      `There are no events within postcal code ${postCode} at the moment`
    )
  }

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
  if (!event) {
    throw new NotFoundError(`Event with ID ${eventId} not found`)
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
