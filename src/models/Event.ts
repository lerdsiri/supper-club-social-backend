import mongoose, { Document } from 'mongoose'

//import { UserDocument } from './User';

//-------//
//-types-//
//-------//

type EventLocDocument = Document & {
  address: string
  city: string
  postCode: string
  country: string
}

/*
export type ReviewDocument = Document & {
    reviewer: UserDocument
    content: string
    score: number
};
*/
export type Review = {
  reviewer: mongoose.Types.ObjectId
  content: string
  score: number
}

export type EventDocument = Document & {
  eventName: string
  eventDateTime: Date
  status: 'ongoing' | 'cancelled' | 'over'
  eventLoc: EventLocDocument
  cuisine: string
  description: string
  responseDateline: Date
  contributionAmt: number
  contributionCurrency: string
  numOfAttendeesAllowed: number
  reviews: Review[]
}

//---------//
//-Schemas-//
//---------//

const eventLocSchema = new mongoose.Schema({
  address: String,
  city: String,
  postCode: String,
  country: String,
})

/*
const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    score: Number     
});
*/

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      unique: true,
    },
    eventDateTime: {
      type: Date,
      required: true,
      min: Date.now,
    },
    status: {
      type: String,
      enum: ['ongoing', 'cancelled', 'over'],
      default: 'ongoing',
    },
    eventLoc: {
      type: eventLocSchema,
      required: true,
    },
    cuisine: String,
    description: {
      type: String,
      required: true,
    },
    responseDateline: {
      type: Date,
      required: true,
      min: Date.now,
    },
    contributionAmt: {
      type: Number,
      required: true,
    },
    contributionCurrency: {
      type: String,
      required: true,
    },
    numOfAttendeesAllowed: {
      type: Number,
      required: true,
    },
    //reviews: [reviewSchema]
    reviews: [
      {
        reviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        content: String,
        score: Number,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model<EventDocument>('Event', eventSchema)
