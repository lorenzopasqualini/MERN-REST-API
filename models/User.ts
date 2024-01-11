import mongoose from 'mongoose'

export interface User extends mongoose.Document {
  name: string
  username: string
  email: string
  address: string
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
    maxlength: [15, 'Username cannot be more than 15 characters'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'E-Mail is required'],
    maxlength: [254, 'E-Mail cannot be more than 254 characters'],
    unique: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    maxlength: [80, 'Address cannot be more than 80 characters'],
  },
})

export default mongoose.models.User || mongoose.model<User>('User', UserSchema)