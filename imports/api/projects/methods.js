import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Projects } from './projects.js';

// Game Categories
export const GameCats = ['Action', 'Adventure', 'Casual', 'MMO', 'Platformer', 'Puzzle',
	'Racing', 'RPG', 'Shooter', 'Simulation', 'Sports', 'Strategy', 'Other'];

// Create Project
export const create = new ValidatedMethod({
  name: 'Projects.methods.create',
  validate: new SimpleSchema({
    title: { type: String },
    category: { type: String },
  }).validator(),
  run({ title, category }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('Projects.methods.create.unauthorized',
        'Must be logged in to create project.');
    }
    // Confirm valid category
    if (!_.contains(GameCats, category)) {
      throw new Meteor.Error(
        'Projects.methods.create.invalidCategory',
        'Category is invalid.');
    }

    // Insert new project
    const timeStamp = new Date('1970-01-01T00:00:00.000Z');
    const username = Meteor.user().username;
    const projectId = Projects.insert({
      title,
      authorName: username,
      authorId: this.userId,
      category,
      coverUploaded: timeStamp,
      description: '',
      gamePlay: '',
      lore: '',
      stars: 0,
    });
    return projectId;
  },
});

// Edit Project
export const editProject = new ValidatedMethod({
  name: 'Projects.methods.editProject',
  validate: new SimpleSchema({
    projectId: { type: String },
    title: { type: String },
    category: { type: String },
    description: { type: String },
    gamePlay: { type: String },
    lore: { type: String },
    tags: { type: String },
  }).validator(),
  run({ projectId, title, category, description, gamePlay, lore, tags }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('Projects.methods.edit.unauthorized',
        'Must be logged in to edit project.');
    }

    // Confirm user owns projectId
    // Can only run on server because the edit form doesn't use a subscription
    // Instead a method in the constructor loads the default form values
    if (!this.isSimulation) {
      const authorId = Projects.findOne({ _id: projectId, authorId: this.userId }, { authorId: 1 });
      if (! authorId) {
        throw new Meteor.Error('Projects.methods.edit.unauthorized',
          'Only author can edit a project.');
      }
    }

    // Confirm valid category
    if (!_.contains(GameCats, category)) {
      throw new Meteor.Error(
        'Projects.methods.edit.invalidCategory',
        'Category is invalid.');
    }
    Projects.update({ _id: projectId }, { $set: {
      title,
      category,
      description,
      gamePlay,
      lore,
      tags,
    } });
    return true;
  },
});

// Get Project by Project Id
export const getById = new ValidatedMethod({
  name: 'Projects.methods.getById',
  validate: new SimpleSchema({
    projectId: { type: String },
  }).validator(),
  run({ projectId }) {
    return Projects.findOne({ _id: projectId });
  },
});

// Get Project by Name
export const getByName = new ValidatedMethod({
  name: 'Projects.methods.getByName',
  validate: new SimpleSchema({
    title: { type: String },
  }).validator(),
  run({ title }) {
    return Projects.findOne({ title });
  },
});

// Confirm title is unique
export const confirmTitleUnique = new ValidatedMethod({
  name: 'Projects.methods.confirmTitleUnique',
  validate: new SimpleSchema({
    title: { type: String },
  }).validator(),
  run({ title }) {
    const project = Projects.findOne({ title }, { title: 1 });
    return !project;
  },
});

// Set Project Cover Art Uploaded Date/Time
export const setCoverUploaded = new ValidatedMethod({
  name: 'Projects.methods.setCoverUploaded',
  validate: new SimpleSchema({
    projectId: { type: String },
  }).validator(),
  run({ projectId }) {
    // Confirm logged in
    if (! this.userId) {
      throw new Meteor.Error('Projects.methods.setCoverUploaded.unauthorized',
        'Must be logged in to change project cover upload time.');
    }

    // Confirm user owns projectId (only on server)
    if (! this.isSimulation) {
      const authorId = Projects.findOne({ _id: projectId, authorId: this.userId }, { authorId: 1 });
      if (! authorId) {
        throw new Meteor.Error('Projects.methods.setCoverUploaded.unauthorized',
          'Only author can edit a project.');
      }
    }

    // Update cover upload date/time
    const uploadDate = new Date();
    Projects.update({ _id: projectId }, { $set: { coverUploaded: uploadDate } });
  },
});
