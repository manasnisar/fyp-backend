const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectSchema = mongoose.Schema(
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
    organizationId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Organization',
      required: true,
    },
    teammembers: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'User',
      required: true,
    },
    timeCreated: {
      type: String,
      required: true,
    },
    totalEpics: {
      type: Number,
      default: 0,
    },
    totalIssues: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

projectSchema.statics.isNameTaken = async function (name, orgId) {
  const project = await this.findOne({ name, organizationId: orgId });
  return !!project;
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
