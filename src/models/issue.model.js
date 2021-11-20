const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const issueSchema = mongoose.Schema(
  {
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    pin: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['task', 'bug'],
      required: true,
    },
    epicId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Epic',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['ICE BOX', 'BLOCKED', 'IN PROGRESS', 'TESTING', 'DONE'],
      default: 'ICE BOX',
    },
    assignee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    reporter: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
issueSchema.plugin(toJSON);
issueSchema.plugin(paginate);

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
