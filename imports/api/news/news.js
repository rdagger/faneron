import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const News = new Mongo.Collection('news');

const schema = new SimpleSchema({
  projectId: {
    type: String,
  },
  subject: {
    type: String,
    label: 'Subject',
    min: 2,
    max: 50,
  },
  message: {
    type: String,
    label: 'Message',
  },
  createdAt: {
    type: Date,
    label: 'Created Date',
    autoValue() {
      return this.isInsert ? new Date() : this.unset();
    },
    denyUpdate: true,
  },
});  // End News.schema
News.attachSchema(schema);

export const Schema = schema._schema;
