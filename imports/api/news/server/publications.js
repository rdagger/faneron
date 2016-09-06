/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { News } from '../news';

Meteor.publish('news', function(limit, projectId) {
  new SimpleSchema({
    limit: { type: Number },
    projectId: { type: String },
  }).validate({ limit, projectId });
  return News.find({ projectId }, { limit: limit || 10, sort: { createdAt: -1 } });
});
