const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactSchema = new Schema(
  {
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
          
    },
    username: {
        type: String,
        required: true,
    },
    //  ***********************array of nexted documents created with the reaction schema
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
},
{
    toJSON: {
        getters: true
    },
    id: false
});
    
module.exports = reactSchema;