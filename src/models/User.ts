import mongoose, { Document, Types } from 'mongoose'

type LocationDocument = Document & {
  city: string
  postCode: string
  country: string
}

export type UserDocument = Document & {
  username: string
  email: string
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
  firstName: String,
  lastName: String,
  profilePic: String,
  isAdmin: Boolean,
  isBanned: Boolean,
  location: locationSchema,
  eventsAsOrganizer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      unique: true,
    },
  ],
  eventsAsAttendee: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      unique: true,
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      unique: true,
    },
  ],
  unreadConversations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      unique: true,
    },
  ],
})

export default mongoose.model<UserDocument>('User', userSchema)
