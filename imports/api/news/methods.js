import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { News } from './news';
import { Projects } from '../projects/projects';

// Add News
export const add = new ValidatedMethod({
  name: 'News.methods.add',
  validate: new SimpleSchema({
    projectId: { type: String },
    subject: { type: String },
    message: { type: String },
  }).validator(),
  run({ projectId, subject, message }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('News.methods.add.unauthorized',
        'Must be logged in to add news.');
    }
    // Confirm user owns projectId
    const authorId = Projects.findOne({ _id: projectId, authorId: this.userId }, { authorId: 1 });
    if (! authorId) {
      throw new Meteor.Error('News.methods.add.unauthorized',
        'Only author can add news to a project.');
    }
    // Insert news
    const newsId = News.insert({
      projectId,
      subject,
      message,
    });
    // Increment news count
    Projects.update({ _id: projectId }, { $inc: { news: 1 } });
    return newsId;
  },
});

// Edit News
export const edit = new ValidatedMethod({
  name: 'News.methods.edit',
  validate: new SimpleSchema({
    newsId: { type: String },
    projectId: { type: String },
    subject: { type: String },
    message: { type: String },
  }).validator(),
  run({ newsId, projectId, subject, message }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('News.methods.edit.unauthorized',
        'Must be logged in to edit news.');
    }
    // Confirm user owns projectId
    const authorId = Projects.findOne({ _id: projectId, authorId: this.userId }, { authorId: 1 });
    if (! authorId) {
      throw new Meteor.Error('News.methods.edit.unauthorized',
        'Only author can edit project news.');
    }
    // Update news
    News.update({ _id: newsId }, { $set: { subject, message } });
  },
});
