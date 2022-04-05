import mongoose, { Document } from 'mongoose'

export type Message = {
  author: mongoose.Types.ObjectId
  content: string
  messageDateTime: Date
}

export type ConversationDocument = Document & {
  event: mongoose.Types.ObjectId
  messages: Message[]
}

const conversationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    messages: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        content: {
          type: String,
        },
        messageDateTime: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model<ConversationDocument>(
  'Conversation',
  conversationSchema
)

// Model below for future use if and when users are allowed
// to send direct messages to one another outside of the message
// board attached to an event
/*
export type Message = {
  author: mongoose.Types.ObjectId
  content: string
  messageDateTime: Date
}

export type ConversationDocument = Document & {
  creator: UserDocument
  participants: UserDocument[]
  subject: string
  event: EventDocument
  //messages: MessageDocument[]
  messages: Message[]
}

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
    messages: [
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
        messageDateTime: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
)
*/
