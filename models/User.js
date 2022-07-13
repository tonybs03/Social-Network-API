const { Schema, model, Types } = require('mongoose');

// Schema according to the assignment readme
const userSchema = new Schema(
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
      match: [/.+\@.+\..+/, 'Invalid email format'],
    },
    thoughts: [
      {
          type: Schema.Types.ObjectId,
          ref: 'thought'
      }
    ],
    friends: [
      {
          type: Schema.Types.ObjectId,
          ref: 'user'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// create a virtual called friendcount
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
