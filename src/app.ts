import express from 'express'
import dotenv from 'dotenv'

import movieRouter from './routers/movie'
import userRouter from './routers/user'
import eventRouter from './routers/event'
// suspended... not used:
import conversationRouter from './routers/conversation'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(express.json())

// Use movie router
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/events', eventRouter)
// conversations suspended...not used:
app.use('/api/v1/conversations', conversationRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
