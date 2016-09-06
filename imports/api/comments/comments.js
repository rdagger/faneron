/* eslint-disable prefer-arrow-callback */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Comments = new Mongo.Collection('comments');
// Probably should have index on projectId and authorId *********
const schema = new SimpleSchema({
  projectId: {
    type: String,
  },
  message: {
    type: String,
    label: 'Description',
  },
  authorName: {
    type: String,
    label: 'Author',
    max: 50,
  },
  authorId: {
    type: String,
    autoValue() {
      return this.isInsert ? this.userId : this.unset();
    },
  },
  avatarUploaded: {
    type: Date,
    label: 'Author Avatar Uploaded',
    defaultValue: new Date('1970-01-01T00:00:00.000Z'),
  },
  abuse: {
    type: Boolean,
    label: 'Abuse',
    defaultValue: false,
  },
  createdAt: {
    type: Date,
    label: 'Created Date',
    autoValue() {
      return this.isInsert ? new Date() : this.unset();
    },
    denyUpdate: true,
  },
});  // end Comments.schema
Comments.attachSchema(schema);

export const Schema = schema._schema;
