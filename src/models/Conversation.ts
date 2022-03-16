// Suspended... not in use for the moment

import mongoose, { Document } from 'mongoose'

import { UserDocument } from './User'
import { EventDocument } from './Event'

type MessageDocument = Document & {
  author: UserDocument
  content: string
}

export type ConversationDocument = Document & {
  creator: UserDocument
  participants: UserDocument[]
  subject: string
  event: EventDocument
  messages: MessageDocument[]
}

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      reuired: true,
    },
  },
  { timestamps: true }
)

const conversationSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      required: true,
    },
    subject: {
      type: String,
      default: 'None',
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
    messages: [messageSchema],
  },
  { timestamps: true }
)

export default mongoose.model<ConversationDocument>(
  'Conversation',
  conversationSchema
)
