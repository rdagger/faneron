/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';
import { Projects } from '../projects';
import { Watches } from '../../watches/watches';

Meteor.startup(function() {
	// Add text search index to project collection for title and tags
  Projects._ensureIndex(
    { title: 'text', tags: 'text' },
    { background: 1 }
  );
});

Meteor.publish('projects', function(limit, search) {
  new SimpleSchema({
    limit: { type: Number },
    search: { type: String, optional: true },
  }).validate({ limit, search });

  if (search) {
    return Projects.find({ $text: { $search: search } },
      { limit: limit || 10, sort: { createdAt: -1 } });
  } else {
    return Projects.find({}, { limit: limit || 10, sort: { createdAt: -1 } });
  }
});

Meteor.publish('projectsByAuthor', function(limit, search) {
  new SimpleSchema({
    limit: { type: Number },
    search: { type: String, optional: true },
  }).validate({ limit, search });
  // Don't publish anything if not logged in
  if (! this.userId) {
    return this.ready();
  }
  if (search) {
    return Projects.find({ authorId: this.userId, $text: { $search: search } },
      { limit: limit || 10, sort: { createdAt: -1 } });
  } else {
    return Projects.find({ authorId: this.userId },
      { limit: limit || 10, sort: { createdAt: -1 } });
  }
});

Meteor.publish('projectsByCat', function(limit, search, category) {
  new SimpleSchema({
    limit: { type: Number },
    search: { type: String, optional: true },
    category: { type: String },
  }).validate({ limit, search, category });

  if (search) {
    return Projects.find({ category, $text: { $search: search } },
      { limit: limit || 10, sort: { createdAt: -1 } });
  } else {
    return Projects.find({ category }, { limit: limit || 10, sort: { createdAt: -1 } });
  }
});

Meteor.publish('projectsByWatch', function(limit, search) {
  new SimpleSchema({
    limit: { type: Number },
    search: { type: String, optional: true },
  }).validate({ limit, search });
  // Don't publish anything if not logged in
  if (! this.userId) {
    return this.ready();
  }
  // Get watched project ID's
  const watch = Watches.find({ userId: this.userId }, { fields: { projectId: 1, _id: 0 } }).fetch();
  // Don't publish any records if no projects being watched
  if (! watch) {
    return this.ready();
  }
  // Convert to array of values
  const watchList = _.pluck(watch, 'projectId');
  if (search) {
    return Projects.find({ _id: { $in: watchList }, $text: { $search: search } },
      { limit: limit || 10, sort: { createdAt: -1 } });
  } else {
    return Projects.find({ _id: { $in: watchList } },
      { limit: limit || 10, sort: { createdAt: -1 } });
  }
});

Meteor.publish('project', function(projectId) {
  new SimpleSchema({
    projectId: { type: String },
  }).validate({ projectId });
  return Projects.find({ _id: projectId });
});

Meteor.publish('projectEdit', function(projectId) {
  new SimpleSchema({
    projectId: { type: String },
  }).validate({ projectId });
  // Don't publish anything if not logged in
  if (! this.userId) {
    return this.ready();
  }
  // Confirm valid project
  const project = Projects.findOne(projectId);
  if (project) {
    const authorId = project.authorId;
    if (authorId) {
      // Confirm current user is the author
      if (this.userId !== authorId) {
        throw new Meteor.Error('Not-authorized.');
      }
    } else {
      throw new Meteor.Error('Author Not Found.');
    }
  } else {
    throw new Meteor.Error('Project Not Found.');
  }
  return Projects.find({ _id: projectId });
});
