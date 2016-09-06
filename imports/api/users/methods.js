import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Comments } from '../comments/comments';

// Change email
export const changeEmail = new ValidatedMethod({
  name: 'Users.methods.changeEmail',
  validate: new SimpleSchema({
    newEmail: { type: String },
  }).validator(),
  run({ newEmail }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('Users.methods.changeEmail.unauthorized',
        'Must be logged in to change email.');
    }
    // Get old email address
    const oldEmail = Meteor.user().emails[0].address;
    if (! oldEmail) {
      throw new Meteor.Error('Users.methods.changeEmail.oldEmailNotFound',
        'Cannot determine old email address.');
    }

    // Confirm new email address does not equal old email address
    if (oldEmail.toLowerCase() === newEmail.toLowerCase()) {
      throw new Meteor.Error('Users.methods.changeEmail.emailNotNew',
      'New email address cannot equal old email address.');
    }

    if (! this.isSimulation) {
      // Add new email
      Accounts.addEmail(this.userId, newEmail);
      // Remove old email
      Accounts.removeEmail(this.userId, oldEmail);
    }
  },
});

// Update Profile
export const updateProfile = new ValidatedMethod({
  name: 'Users.methods.updateProfile',
  validate: new SimpleSchema({
    location: { type: String, max: 35 },
    website: { type: String, max: 35 },
    notifications: { type: Boolean, defaultValue: false },
  }).validator(),
  run({ location, website, notifications }) {
    // Make sure the user is logged in
    if (! this.userId) {
      throw new Meteor.Error('Users.methods.updateProfile.notAuthorized',
        'Not-authorized.');
    }
    Meteor.users.update({ _id: this.userId },
      { $set: { 'profile.location': location,
      'profile.website': website,
      'profile.sendNotifications': notifications } }, {}, (error) => {
        if (error) {
          throw new Meteor.Error('Users.methods.updateProfile.unknownError',
            error.message);
        }
      });
  },
});

// Set avatar upload timestamp
export const setAvatarUploaded = new ValidatedMethod({
  name: 'Users.methods.setAvatarUploaded',
  validate: new SimpleSchema({}).validator(),
  run() {
    // Make sure the user is logged in
    if (! this.userId) {
      throw new Meteor.Error('Users.methods.setAvatarUploaded.notAuthorized',
        'Not-authorized.');
    }
    // Update timestamp in users collection
    Meteor.users.update({ _id: this.userId },
      { $set: { 'profile.avatarUploaded': new Date() } }, {},
      (error) => {
        if (error) {
          throw new Meteor.Error('Users.methods.setAvatarUploaded.unknownError',
            error.message);
        }
      }
    );
    // Denormalize to Comments (multi required for all records)
    Comments.update({ authorId: this.userId },
      { $set: { avatarUploaded: new Date() } },
      { multi: true }
    );
  },
});
