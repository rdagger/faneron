import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Watches = new Mongo.Collection('watches');

Watches.schema = new SimpleSchema({
  projectId: {
    type: String,
    index: true,
  },
  userId: {
    type: String,
    index: true,
  },
}); // End Watches.schema
Watches.attachSchema(Watches.schema);
