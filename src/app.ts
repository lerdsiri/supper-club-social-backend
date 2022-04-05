import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import userRouter from './routers/user'
import eventRouter from './routers/event'
import conversationRouter from './routers/conversation'
import { jwtStrategy } from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

// Middleware
// Express configuration
app.use(apiContentType)
app.use(express.json({ limit: '50mb'}))
app.use(cors())
passport.use(jwtStrategy)

// Use routers
app.use('/api/v1/users', userRouter)
app.use('/api/v1/events', eventRouter)
app.use('/api/v1/conversations', conversationRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
