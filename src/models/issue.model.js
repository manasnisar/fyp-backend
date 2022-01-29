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
      enum: ['ready', 'blocked', 'inProgress', 'inQa', 'done', 'unplanned', 'planned'],
      default: 'unplanned',
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
