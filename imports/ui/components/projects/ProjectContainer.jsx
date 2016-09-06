import { Meteor } from 'meteor/meteor';
import { Projects } from '../../../api/projects/projects';
import { Stars } from '../../../api/stars/stars';
import { Watches } from '../../../api/watches/watches';
import { createContainer } from 'meteor/react-meteor-data';
import Project from './Project.jsx';

export default createContainer((props) => {
  // Projects
  const projectId = props.projectId;
  const projectHandle = Meteor.subscribe('project', projectId);
  let project = {};
  if (projectHandle.ready()) {
    project = Projects.findOne({ _id: projectId });
  }

  // Starred
  const starredHandle = Meteor.subscribe('starred', projectId);
  let starred = {};
  if (starredHandle.ready()) {
    starred = Stars.findOne({ projectId, userId: Meteor.userId() });
  }

  // Watched
  const watchedHandle = Meteor.subscribe('watched', projectId);
  let watched = {};
  if (watchedHandle.ready()) {
    watched = Watches.findOne({ projectId, userId: Meteor.userId() });
  }

  return {
    project,
    projectLoading: !projectHandle.ready(),
    starred: !!starred,
    starredLoading: !starredHandle.ready(),
    watched: !!watched,
    watchedLoading: !watchedHandle.ready(),
    currentUser: Meteor.user(),
  };
}, Project);
