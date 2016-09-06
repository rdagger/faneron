import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Projects = new Mongo.Collection('projects');

Projects.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
    min: 2,
    max: 35,
    index: true,
    unique: true,
  },
  authorName: {
    type: String,
    label: 'Author',
    max: 50,
  },
  authorId: {
    type: String,
  },
  createdAt: {
    type: Date,
    label: 'Created Date',
    autoValue() {
      return this.isInsert ? new Date() : this.unset();
    },
    denyUpdate: true,
  },
  stars: {
    type: Number,
    label: 'Stars',
    min: 0,
    defaultValue: 0,
  },
  comments: {
    type: Number,
    label: 'Comments',
    min: 0,
    defaultValue: 0,
  },
  news: {
    type: Number,
    label: 'News',
    min: 0,
    defaultValue: 0,
  },
  category: {
    type: String,
    label: 'Category',
  },
  description: {
    type: String,
    label: 'Description',
    optional: true,
  },
  gamePlay: {
    type: String,
    label: 'Game Play',
    optional: true,
  },
  lore: {
    type: String,
    label: 'Lore',
    optional: true,
  },
  tags: {
    type: String,
    label: 'Tags',
    max: 50,
    optional: true,
  },
  coverUploaded: {
    type: Date,
  },
});  // End Projects.schema

Projects.attachSchema(Projects.schema);
