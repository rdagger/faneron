import { Meteor } from 'meteor/meteor';
import { Projects } from '../../../api/projects/projects';
import { createContainer } from 'meteor/react-meteor-data';
import Grid from './Grid.jsx';

export default createContainer((props) => {
  const { category, limit, increaseLimit, search, currentUser } = props;

  let projectsHandle = null;
  let projects = {};
  if (category === 'All Categories') {
    // All projects
    projectsHandle = Meteor.subscribe('projects', limit, search);
    if (projectsHandle.ready()) {
      projects = Projects.find({}, { sort: { createdAt: -1 } }).fetch();
    }
  } else if (category === 'My Projects') {
    // User Projects
    projectsHandle = Meteor.subscribe('projectsByAuthor', limit, search);
    if (projectsHandle.ready()) {
      projects = Projects.find({}).fetch();
    }
  } else if (category === 'Watching' && currentUser) {
    // Watched Projects
    projectsHandle = Meteor.subscribe('projectsByWatch', limit, search);
    if (projectsHandle.ready()) {
      projects = Projects.find({}).fetch();
    }
  } else {
    // Projects by category
    projectsHandle = Meteor.subscribe('projectsByCat', limit, search, category);
    if (projectsHandle.ready()) {
      projects = Projects.find({}).fetch();
    }
  }

  return {
    projects,
    projectsLoading: !projectsHandle.ready(),
    category,
    limit,
    increaseLimit,
  };
}, Grid);
