import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { News } from '../../../api/news/news';
import { createContainer } from 'meteor/react-meteor-data';
import ProjectNews from './News';

// Number of items to show (must be declared outside of container)
const limit = new ReactiveVar(3);

export default createContainer((props) => {
  const projectId = props.project._id;
  let news = [];
  const newsHandle = Meteor.subscribe('news', limit.get(), projectId);
  if (newsHandle.ready()) {
    news = News.find({ projectId }, { sort: { createdAt: -1 } }).fetch();
  }

  return {
    news,
    newsLoading: !newsHandle.ready(),
    project: props.project,
    limit,
    currentUser: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  };
}, ProjectNews);
