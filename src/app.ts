import express from 'express'
import dotenv from 'dotenv'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import userRouter from './routers/user'
import eventRouter from './routers/event'
import conversationRouter from './routers/conversation'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(express.json())

// Use routers
app.use('/api/v1/users', userRouter)
app.use('/api/v1/events', eventRouter)
app.use('/api/v1/conversations', conversationRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
