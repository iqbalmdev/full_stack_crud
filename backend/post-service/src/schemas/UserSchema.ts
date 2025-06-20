import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  // other user fields
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
