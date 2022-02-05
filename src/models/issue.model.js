const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const issueSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['task', 'bug', 'story'],
      required: true,
    },
    epicId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Epic',
      required: true,
    },
    status: {
      type: String,
      enum: ['ready', 'blocked', 'inProgress', 'inQa', 'done', 'unplanned', 'planned', 'archived'],
      default: 'unplanned',
    },
    previousSprintStatus: {
      type: String,
      enum: ['ready', 'blocked', 'inProgress', 'inQa'],
    },
    estimate: {
      type: Number,
    },
    comments: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Comment',
    },
    timeSpent: {
      type: Number,
    },
    timeRemaining: {
      type: Number,
    },
    priority: {
      type: String,
      enum: ['1', '2', '3', '4', '5'],
      default: '5',
    },
    assigneeId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    reporterId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    assignee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    reporter: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    creationDate: { type: Date },
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
