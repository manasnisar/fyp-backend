const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const epicSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    priority: {
      type: String,
      enum: ['1', '2', '3', '4', '5'],
      default: '5',
    },
    projectId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    activityStatus: {
      type: String,
      enum: ['backlog', 'active'],
      default: 'backlog',
    },
    totalIssues: {
      type: Number,
      default: 0,
    },
    creationDate: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
epicSchema.plugin(toJSON);
epicSchema.plugin(paginate);

const Epic = mongoose.model('Epic', epicSchema);

module.exports = Epic;
