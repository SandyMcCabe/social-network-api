const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [ 
        {
            type: Schema.Types.ObjectID,
            ref:'Thought', 
        },
    ],
    friends: [ 
        {
            type: Schema.Types.ObjectID,
            ref:'User', 
        },
    ],
},
    {
        toJSON:{
            virtuals: true,
        },
        id: false,
    }
);


// create a virtual called friendCount that retrieves the length of the user's friends array field on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;