import mongoose, { Document } from 'mongoose'

import { UserDocument } from './User'
import { EventDocument } from './Event'

/*
type MessageDocument = Document & {
  author: mongoose.Types.ObjectId
  content: string
}
*/

export type Message = {
  author: mongoose.Types.ObjectId
  content: string
  messageDateTime: Date
}

export type ConversationDocument = Document & {
  // creator: UserDocument
  // participants: UserDocument[]
  // subject: string
  event: EventDocument
  //messages: MessageDocument[]
  messages: Message[]
}

/*
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
);
*/

const conversationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    //messages: [messageSchema]
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

// Below model may be used when direct messages are permitted.
// Only message board attached to a particular event is allowed currently.
/*
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
    //messages: [messageSchema]
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

export default mongoose.model<ConversationDocument>(
  'Conversation',
  conversationSchema
)
