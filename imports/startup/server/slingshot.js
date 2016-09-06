import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';
import { Projects } from '../../api/projects/projects';

// Project Cover Art
Slingshot.fileRestrictions('coverUpload', {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
  maxSize: 10 * 1024 * 1024,
});

Slingshot.createDirective('coverUpload', Slingshot.S3Storage, {
  bucket: 'faneron',
  acl: 'public-read',
  authorize: function(file, metaContext) {
    // Deny uploads if user is not logged in.
    if (! this.userId) {
      return false;
    } else {
      const project = Projects.findOne(metaContext.projectId);
      // Denied if project doesn't exist or if it is not owned by the current user.
      return project && project.authorId === this.userId;
    }
  },
  region: Meteor.settings.region,
  key: function(file, metaContext) {
    // Make sure the user is logged in
    if (! this.userId) {
      throw new Meteor.Error('Not-authorized.');
    }
    if (metaContext.thumb) {
      // Store thumb into a directory
      return `projects/${metaContext.projectId}/thumb.jpg`;
    } else {
      // Store cover into a directory
      return `projects/${metaContext.projectId}/cover.jpg`;
    }
  },
});

// User Account Profile Avatar
Slingshot.fileRestrictions('avatarUpload', {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
  maxSize: 10 * 1024 * 1024,
});

Slingshot.createDirective('avatarUpload', Slingshot.S3Storage, {
  bucket: 'faneron',
  acl: 'public-read',
  authorize: function() {
    // Deny uploads if user is not logged in.
    if (! this.userId) {
      return false;
    } else {
      return true;
    }
  },
  region: Meteor.settings.region,
  key: function() {
    // Make sure the user is logged in
    if (! this.userId) {
      throw new Meteor.Error('Not-authorized.');
    }
    // Store file into a directory
    return `users/${this.userId}/avatar.jpg`;
  },
});
