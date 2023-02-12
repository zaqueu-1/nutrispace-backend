const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
}, 
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('pass')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.pass, salt);
    user.pass = hash;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    userSchema,
};