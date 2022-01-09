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
    createdAt: {
      type: Date,
      default: Date.now,
//   ***********************uses a getter method to format the timestamp on query    
    
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
    //  ***********************array of nexted documents created with the reaction schema
    },
    
// retrieves the length of the thought's reactions array field on query
UserSchema.virtual('reactionCount').get(function() {

});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;