/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Stars } from '../stars';

Meteor.publish('starred', function(projectId) {
  new SimpleSchema({
    projectId: { type: String },
  }).validate({ projectId });
  // Don't publish anything if not logged in
  if (! this.userId) {
    return this.ready();
  }
  return Stars.find({ projectId, userId: this.userId });
});
