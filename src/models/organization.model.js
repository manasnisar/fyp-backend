const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const orgSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    Owner: {
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
orgSchema.plugin(toJSON);
orgSchema.plugin(paginate);

orgSchema.statics.isOrganizationNameTaken = async function (name) {
  const organization = await this.findOne({ name });
  return !!organization;
};

const Organization = mongoose.model('Organization', orgSchema);

module.exports = Organization;
