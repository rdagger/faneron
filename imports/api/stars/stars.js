import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Stars = new Mongo.Collection('stars');

Stars.schema = new SimpleSchema({
  projectId: {
    type: String,
    index: true,
  },
  userId: {
    type: String,
    index: true,
  },
});  // End Stars.schema
Stars.attachSchema(Stars.schema);
