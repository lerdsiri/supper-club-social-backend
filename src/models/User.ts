import mongoose, { Document, Types } from 'mongoose'

type LocationDocument = Document & {
  city: string
  postCode: string
  country: string
}

export type UserDocument = Document & {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  profilePic: string
  isAdmin: boolean
  isBanned: boolean
  location: LocationDocument
  eventsAsOrganizer: mongoose.Types.ObjectId[]
  eventsAsAttendee: mongoose.Types.ObjectId[]
  cart: mongoose.Types.ObjectId[]
  unreadConversations: mongoose.Types.ObjectId[]
}

const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  postCode: String,
  country: String,
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  profilePic: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  location: locationSchema,
  eventsAsOrganizer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  eventsAsAttendee: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  unreadConversations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
    },
  ],
})

export default mongoose.model<UserDocument>('User', userSchema)
