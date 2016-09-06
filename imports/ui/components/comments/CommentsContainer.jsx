import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Comments } from '../../../api/comments/comments';
import { createContainer } from 'meteor/react-meteor-data';
import ProjectComments from './Comments';

// Number of items to show (must be declared outside of container)
const limit = new ReactiveVar(3);

export default createContainer((props) => {
  const projectId = props.project._id;
  let comments = [];
  const commentsHandle = Meteor.subscribe('comments', limit.get(), projectId);
  if (commentsHandle.ready()) {
    comments = Comments.find({ projectId }, { sort: { createdAt: -1 } }).fetch();
  }

  return {
    comments,
    commentsLoading: !commentsHandle.ready(),
    project: props.project,
    limit,
    currentUser: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  };
}, ProjectComments);
