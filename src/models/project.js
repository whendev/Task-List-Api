const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    required: true,
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tasks: [{
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ['incomplete', 'finished'],
      default: 'incomplete',
    },
  }],
  status: {
    type: String,
    required: true,
    enum: ['created', 'done'],
    default: 'created',
  },
});

module.exports = mongoose.model('project', schema);
