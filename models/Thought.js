const { Schema, model, Types } = require('mongoose');
const moment = require('moment');


// create reactionschema based on readme
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
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
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdat => moment(createdat).format('MMM DD, YYYY hh:mm a')  
    },
  },
  {
    toJSON: {
      virtuals: true, //virtuals enabled
      getters: true   //getters enabled
    },
    id: false
  }
);


// thought schema based on readme
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdat => moment(createdat).format('MMM DD, YYYY hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true, //virtuals enabled
      getters: true   //getters enabled
    },
    id: false
  }
);


// create a virtual called reactioncount
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });





const Thought = model('thought', thoughtSchema);

module.exports = Thought;
