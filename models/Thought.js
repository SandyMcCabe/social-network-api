const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'must leave a thought',
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //   ***********************uses a getter method to format the timestamp on query    
      get:timestamp => dateFormat(timestamp)
    
    },
    username: {
        type: String,
        required: true,
    },
    //  ***********************array of nexted documents created with the reaction schema
    reactions: [
        reactSchema
    ],
},
{
    toJSON: {
        getters: true
    },
    id: false
});
    
// retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactSchema.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;