const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const epicSchema = mongoose.Schema(
  {
    name: {
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
      enum: ['epic', 'story'],
      default: 'epic',
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
    status: {
      type: String,
      enum: ['ICE BOX', 'IN PROGRESS', 'DONE'],
      default: 'ICE BOX',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
epicSchema.plugin(toJSON);
epicSchema.plugin(paginate);

epicSchema.statics.isNameTaken = async function (name, projectId) {
  const project = await this.findOne({ name, projectId });
  return !!project;
};

const Epic = mongoose.model('Epic', epicSchema);

module.exports = Epic;
