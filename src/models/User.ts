import mongoose, { Document } from 'mongoose'

type LocationDocument = Document & {
  city: string
  postCode: number
  country: string
}

export type UserDocument = Document & {
  email: string
  firstName: string
  lastName: string
  profilePic: string
  isAdmin: boolean
  isBanned: boolean
  location: LocationDocument
}

const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  postCode: Number,
  country: String,
})

const userSchema = new mongoose.Schema({
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
})

export default mongoose.model<UserDocument>('User', userSchema)
