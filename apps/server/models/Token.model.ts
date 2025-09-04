import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['emailConfirmation', 'passwordReset', 'emailUpdate', 'emailLogin'],
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
  },
  expires: {
    type: Date,
  },
});

const Token = mongoose.model('Token', TokenSchema);

export default Token;
