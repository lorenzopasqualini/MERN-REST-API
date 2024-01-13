import mongoose from 'mongoose'

export interface User extends mongoose.Document {
  name: string
  username: string
  email: string
  address: string
  external_id: number
}

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [40, 'Name cannot be more than 40 characters'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    maxlength: [40, 'Username cannot be more than 40 characters'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'E-Mail is required'],
    maxlength: [254, 'E-Mail cannot be more than 254 characters'],
    unique: true,
  },
  address: {
    street:{
      type: String,
      required: [true, 'Street address is required'],
      maxlength: [80, 'Street address cannot be more than 80 characters'],
    },
    suite:{
      type: String,
      required: [true, 'Suite address is required'],
      maxlength: [40, 'Street address cannot be more than 40 characters'],
    }
  },
  external_id: {
    type: Number,
    required: true,
  },
})

export default mongoose.models.User || mongoose.model<User>('User', UserSchema)