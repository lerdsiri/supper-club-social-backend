import express from 'express'
import passport from 'passport'

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
router.post('/', passport.authenticate('jwt', { session: false }), createEvent)

//retrieve
router.get('/', getAllEvents)
router.get('/:eventId', getEventById)
router.get('/city/:city', getEventsByCity)
router.get('/postCode/:postCode', getEventsByPostCode)

//update
router.put(
  '/:eventId',
  passport.authenticate('jwt', { session: false }),
  editEventById
)

//delete
router.delete(
  '/:eventId',
  passport.authenticate('jwt', { session: false }),
  removeEventById
)

//add review to event
router.patch(
  '/:eventId/reviews',
  passport.authenticate('jwt', { session: false }),
  addReviewToEvent
)

export default router
