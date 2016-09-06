import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Comments } from './comments';
import { Projects } from '../projects/projects';

// Add comment
export const add = new ValidatedMethod({
  name: 'Comments.methods.add',
  validate: new SimpleSchema({
    projectId: { type: String },
    message: { type: String },
  }).validator(),
  run({ projectId, message }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('Comments.methods.add.unauthorized',
        'Must be logged in to add comments.');
    }
    const username = Meteor.user().username;
    // Insert comments
    const commentId = Comments.insert({
      projectId,
      message,
      authorName: username,
    });
    // Increment comments count
    Projects.update({ _id: projectId }, { $inc: { comments: 1 } });
    return commentId;
  },
});

// Edit comment
export const edit = new ValidatedMethod({
  name: 'Comments.methods.edit',
  validate: new SimpleSchema({
    commentId: { type: String },
    message: { type: String },
  }).validator(),
  run({ commentId, message }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('Comments.methods.edit.unauthorized',
        'Must be logged in to edit comments.');
    }
    // Confirm user owns comment
    const authorName = Comments.findOne({ _id: commentId, authorId: this.userId },
      { authorName: 1 });
    if (! authorName) {
      throw new Meteor.Error('Comments.methods.edit.unauthorized',
        'Only comment author can edit.');
    }
    // Update comment
    Comments.update({ _id: commentId }, { $set: { message } });
  },
});

// Flag comment
export const flag = new ValidatedMethod({
  name: 'Comments.methods.flag',
  validate: new SimpleSchema({
    commentId: { type: String },
  }).validator(),
  run({ commentId }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('Comments.methods.flag.unauthorized',
        'Must be logged in to flag a comment for abuse.');
    }
    // Set comment abuse flag
    Comments.update({ _id: commentId }, { $set: { abuse: true } });
  },
});

// Remove comment
export const remove = new ValidatedMethod({
  name: 'Comments.methods.remove',
  validate: new SimpleSchema({
    commentId: { type: String },
  }).validator(),
  run({ commentId }) {
    // Confirm user logged
    if (! this.userId) {
      throw new Meteor.Error('Comments.methods.remove.unauthorized',
        'Must be logged in to remove comments.');
    }
    // Get comment
    const comment = Comments.findOne({ _id: commentId }, { fields: { projectId: 1, authorId: 1 } });
    if (! comment) {
      throw new Meteor.Error('Comments.methods.remove.notFound',
        `Unable to retrieve comment ${commentId}.`);
    }
    // Get project authorId
    const project = Projects.findOne({ _id: comment.projectId }, { fields: { authorId: 1 } });
    if (! project) {
      throw new Meteor.Error('Comments.methods.remove.authorNotFound',
        'Unable to retrieve project author.');
    }

    // Confirm user created comment or user is project author
    if (this.userId !== comment.authorId && this.userId !== project.authorId) {
      throw new Meteor.Error('Comments.methods.remove.unauthorized',
        'Must be the comment author or project author to delete.');
    }

    // Delete comment
    Comments.remove({ _id: commentId });
    // Update project comments count
    Projects.update({ _id: comment.projectId }, { $inc: { comments: -1 } });
  },
});
