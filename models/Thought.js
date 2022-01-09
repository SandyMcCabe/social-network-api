const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

var thoughtValidator = [
    validate({
      validator: 'isLength',
      arguments: [1, 280],
      message: 'Thought should be between 1 and 280 characters'
    })
];

const thought = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      validate: thoughtValidator
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    //   *****************must match valid email address******************
    },
    thoughts: {
//   ***********************array of id values referencing the THought model
    },
    friends: {
    //  ***********************array of id values referencing the user model (self-reference)
    },
    
// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {

});

const User = model('User', UserSchema);

module.exports = User;