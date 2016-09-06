import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Stars } from './stars';
import { Projects } from '../projects/projects';

// Star Project
export const star = new ValidatedMethod({
  name: 'Stars.methods.star',
  validate: new SimpleSchema({
    projectId: { type: String },
  }).validator(),
  run({ projectId }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('Stars.methods.star.unauthorized',
        'Must be logged in to star.');
    }

    // Prevent double star
    if (! this.isSimmulation) {
      const existingStar = Stars.findOne({ projectId, userId: this.userId });
      if (existingStar) {
        throw new Meteor.Error('Stars.methods.star.duplicate',
          'User can only star project once.');
      }
    }

    // Add star
    Stars.insert({ projectId, userId: this.userId });
    // Increment project star count
    Projects.update({ _id: projectId }, { $inc: { stars: 1 } });
  },
});

// Unstar Project
export const unstar = new ValidatedMethod({
  name: 'Stars.methods.unstar',
  validate: new SimpleSchema({
    projectId: { type: String },
  }).validator(),
  run({ projectId }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('Stars.methods.unstar.unauthorized',
        'Must be logged in to unstar.');
    }

    // Prevent negative star
    if (! this.isSimmulation) {
      const existingStar = Stars.findOne({ projectId, userId: this.userId });
      if (! existingStar) {
        throw new Meteor.Error('Stars.methods.unstar.negative',
          'User cannot unstar a project with no stars.');
      }
    }

    // Remove star
    Stars.remove({ projectId, userId: this.userId });
    // Decrement project stars
    Projects.update({ _id: projectId }, { $inc: { stars: -1 } });
  },
});
