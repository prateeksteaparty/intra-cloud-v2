const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }

}, {timestamps: true});

const dataSchema = mongoose.Schema({
    username: {
      type: String
    },
    imgName: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    createdAt : {
      type: Date,
      default: Date.now,
      expires: 60
    }
  });

const User = mongoose.model('User', userSchema);
const Data = mongoose.model('Data', dataSchema);


module.exports = {
    User,
    Data
}