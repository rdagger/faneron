/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Comments } from '../comments';

Meteor.publish('comments', function(limit, projectId) {
  new SimpleSchema({
    limit: { type: Number },
    projectId: { type: String },
  }).validate({ limit, projectId });
  return Comments.find({ projectId }, { limit: limit || 10, sort: { createdAt: -1 } });
});
