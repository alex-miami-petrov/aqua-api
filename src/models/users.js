import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,

      required: true,
    },
    name: {
      type: String,
      default: 'User',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    waterNorma: {
      type: Number,
      default: 1500,
      max: 15000,
    },
    weight: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['woman', 'man'],
      default: 'woman',
    },
    activeTime: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
      default:
        'https://res.cloudinary.com/dwshxlkre/image/upload/v1736365275/avatar_yajq6q.png',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Users = mongoose.model('Users', usersSchema);

export default Users;
