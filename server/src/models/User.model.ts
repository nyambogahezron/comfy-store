import mongoose, { InferSchemaType } from 'mongoose';
import bcrypt from 'bcryptjs';
import { EmailValidator } from '../utils/validator';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name must be at most 50 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: 'default.jpg',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
    },
    verificationToken: { type: String },
    isVerified: { type: Boolean, default: false },
    passwordResetToken: { type: String },
    passwordToken: { type: String },
    passwordTokenExpires: { type: Date },
    accountStatus: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @type User types
 * @description extracted from the schema
 */
type IUser = InferSchemaType<typeof UserSchema>;

/**
 * @type User methods
 */
interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * @description Validate email
 */
UserSchema.path('email').validate(async (email: string) => {
  EmailValidator(email);
}, 'Invalid email');

/**
 *
 * @param enteredPassword
 * @returns  boolean
 * @description Compare password
 */
UserSchema.methods.comparePassword = async function (enteredPassword: any) {
  const user = await mongoose
    .model('User')
    .findById(this._id)
    .select('+password');
  const password = user?.password;
  if (!password) {
    return false;
  }
  const isMatch = await bcrypt.compare(enteredPassword, password);

  return isMatch;
};

/**
 * @description Hash password before saving
 */
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUser & IUserMethods>('User', UserSchema);

export default User;
