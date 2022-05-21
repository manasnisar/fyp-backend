const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const NotificationSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    read: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      enum: [
        'added_comment',
        'issue_update',
        'issue_delete',
        'issue_assigned',
        'issue_unassigned',
        'epic_update',
        'epic_delete',
        'sprint_started',
        'sprint_ended',
      ],
    },
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issue',
    },
    epic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Epic',
    },
  },
  {
    timestamps: true,
  }
);

NotificationSchema.plugin(toJSON);
NotificationSchema.plugin(paginate);

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
