const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER']
    },
    max_calories: {
      type: Number,
      default: 2100
    }


  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('User', userSchema);
