const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const vendorProfileSchema = new mongoose.Schema(
  {
    shopName: { type: String, trim: true },
    description: { type: String, trim: true },
    logo: String,
    phone: String,
    address: String,
    approved: { type: Boolean, default: false },
  },
  { _id: false, timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'vendor', 'admin'],
      default: 'user',
    },
    isBlocked: { type: Boolean, default: false },
    vendorProfile: vendorProfileSchema,
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

