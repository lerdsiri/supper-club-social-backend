import express from 'express'
import {
  createEvent,
  getAllEvents,
  getEventsByCity,
  getEventsByPostCode,
  getEventById,
  removeEventById,
  editEventById,
  addReviewToEvent,
} from '../controllers/event'

const router = express.Router()

//create an event
router.post('/', createEvent)

//retrieve
router.get('/', getAllEvents)
router.get('/:eventId', getEventById)
router.get('/city/:city', getEventsByCity)
router.get('/postCode/:postCode', getEventsByPostCode)

//update
router.put('/:eventId', editEventById)

//delete
router.delete('/:eventId', removeEventById)

//add review to event
router.patch('/:eventId/reviews', addReviewToEvent)

export default router
