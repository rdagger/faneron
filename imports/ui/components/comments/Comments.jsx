import React from 'react';
import { Loading } from '../../helpers/Loading';
import CommentsList from './List';
import CommentsAdd from './Add';
import CommentsEdit from './Edit';

import RaisedButton from 'material-ui/RaisedButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

export default class Comments extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleAddEditClose = this._handleAddEditClose.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);
    this._handleEditComment = this._handleEditComment.bind(this);
    this._handleReplyComment = this._handleReplyComment.bind(this);

    // Initial State
    this.state = {
      replyName: null,
      showAddScreen: false,
      showEditScreen: null,
    };
  }  // End constructor

  _handleAddEditClose() {
    this.setState({ showAddScreen: false });
    this.setState({ showEditScreen: null });
  }

  _handleAddComment() {
    // Clear reply name firstChild
    this.setState({ replyName: null }, () => {
      this.setState({ showAddScreen: true });
    });
  }

  _handleEditComment(comment) {
    if (comment) {
      this.setState({ showEditScreen: comment });
    } else {
      this.setState({ showEditScreen: null });
    }
  }

  _handleReplyComment(replyName) {
    // Clear reply name firstChild
    this.setState({ replyName }, () => {
      this.setState({ showAddScreen: true });
    });
  }

  render() {
    const project = this.props.project;
    let addScreen = null;
    let addCommentButton = null;
    let editScreen = null;
    let commentsList = null;
    let commentsLoadingIndicator = null;
    const currentUser = this.props.currentUser;

    if (this.state.showAddScreen) {
      addScreen = (
        <CommentsAdd
          projectId={project._id}
          replyName={this.state.replyName}
          close={this._handleAddEditClose}
          currentUser={currentUser}
          loggingIn={this.props.loggingIn}
        />);
    } else if (this.state.showEditScreen) {
      editScreen = (
        <CommentsEdit
          comment={this.state.showEditScreen}
          close={this._handleAddEditClose}
          currentUser={currentUser}
          loggingIn={this.props.loggingIn}
        />);
    } else {
      // Comments List
      commentsList = (
        <CommentsList
          comments={this.props.comments}
          commentsLoading={this.props.commentsLoading}
          projectAuthorId={project.authorId}
          reply={this._handleReplyComment}
          edit={this._handleEditComment}
          moreComments={project.comments > this.props.limit.get()}
          limit={this.props.limit}
          currentUser={currentUser}
        />
      );

      // Show add comments button if user logged in
      if (currentUser) {
        addCommentButton = 	(
          <RaisedButton
            style={styles.addButton}
            fullWidth={false}
            label="Add Comments"
            labelStyle={{ color: 'Black' }}
            labelPosition="before"
            secondary={true}
            onTouchTap={this._handleAddComment}
          >
            <ContentAddCircle color="Black" />
          </RaisedButton>);
      }

      // Check if comments loading
      if (this.props.commentsLoading) {
        commentsLoadingIndicator = <Loading top={-196} />;
      }
    }
    return (
      <div style={styles.commentsWrapper}>
        {addCommentButton}
        {addScreen}
        {editScreen}
        {commentsList}
        <div style={styles.indicator}>
          {commentsLoadingIndicator}
        </div>
      </div>
    );
  }

}  // End Comments

Comments.propTypes = {
  comments: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  commentsLoading: React.PropTypes.bool.isRequired,
  project: React.PropTypes.object.isRequired,
  limit: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
};

const styles = {
  commentsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  addButton: {
    marginTop: '10px',
    maxWidth: '180px',
  },

  indicator: {
    width: '70px',
    position: 'relative',  // Indicator is absolute to position
    alignSelf: 'center',
  },
};
