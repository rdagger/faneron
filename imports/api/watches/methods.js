import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Watches } from './watches.js';

// Add project watch
export const watch = new ValidatedMethod({
  name: 'Watches.methods.add',
  validate: new SimpleSchema({
    projectId: { type: String },
  }).validator(),
  run({ projectId }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('Watches.methods.add.unauthorized',
        'Must be logged in to watch.');
    }

    // Prevent double watch
    if (! this.isSimmulation) {
      const existingWatch = Watches.findOne({ projectId, userId: this.userId });
      if (existingWatch) {
        throw new Meteor.Error('Watches.methods.watch.duplicate',
          'User can only watch project once.');
      }
    }

    // Add to watch collection
    Watches.insert({ projectId, userId: this.userId });
    // Increment watch count
    Meteor.users.update({ _id: this.userId }, { $inc: { 'profile.watch': 1 } });
  },
});

// Remove project watch
export const unwatch = new ValidatedMethod({
  name: 'Watches.methods.remove',
  validate: new SimpleSchema({
    projectId: { type: String },
  }).validator(),
  run({ projectId }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('Watches.methods.remove.unauthorized',
        'Must be logged in to remove watch.');
    }

    // Prevent negative watch
    if (! this.isSimmulation) {
      const existingWatch = Watches.findOne({ projectId, userId: this.userId });
      if (! existingWatch) {
        throw new Meteor.Error('Watches.methods.unwatch.negative',
          'User cannot unwatch a project that is not watched.');
      }
    }

    // Remove from watch collection
    Watches.remove({ projectId, userId: this.userId });
    // Decrement watch count
    Meteor.users.update({ _id: this.userId }, { $inc: { 'profile.watch': -1 } });
  },
});
