import React from 'react';
import { AuthorAvatar } from './AuthorAvatar';  // Pure render function (use braces)
import CardButtons from './CardButtons';
import { MarkdownElement } from '../../helpers/markdown/MarkdownElement';

import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import FlatButton from 'material-ui/FlatButton';

export default class List extends React.Component {
  constructor() {
    super();
    // Autobind
    this._showMore = this._showMore.bind(this);
    this._handleCommentEdit = this._handleCommentEdit.bind(this);
  }  // End constructor

  shouldComponentUpdate(nextProps) {
    if (nextProps.commentsLoading) {
      return false;
    }
    return true;
  }

  _showMore() {
    this.props.limit.set(this.props.limit.get() + 3);
  }

  _handleCommentEdit(comment) {
    if (comment) {
      this.props.edit(comment);
    }
  }

  _timeSince(date) {
    const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return `${monthList[date.getMonth()]}'${date.getYear() % 100}`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${monthList[date.getMonth()]}'${date.getYear() % 100}`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval}d`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval}h`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval}m`;
    }
    return `${Math.floor(seconds)}s`;
  }

  render() {
    let content = null;
    let showMoreButton = null;

    if (this.props.moreComments) {
      showMoreButton = (
        <FlatButton
          key="0"
          label="Load More"
          labelStyle={styles.ShowMoreLabel}
          primary={true}
          style={styles.showMoreButton}
          onTouchTap={this._showMore}
        />
      );
    }

    const currentUser = this.props.currentUser;
    const comments = this.props.comments;
    if (comments.length) {
      content = comments.map((comment) => {
        // Comment actions
        let cardButtons = null;
        if (!this.props.commentsLoading) {
          cardButtons = (
            <CardButtons
              comment={comment}
              projectAuthorId={this.props.projectAuthorId}
              reply={this.props.reply}
              edit={this._handleCommentEdit}
              commentId={comment._id}
              message={comment.message}
              authorId={comment.authorId}
              remove={this._handleCommentDelete}
              flag={this._handleCommentFlag}
              currentUser={currentUser}
            />
          );
        }

        return (
          <Card
            style={styles.commentCard}
            key={comment._id}
            initiallyExpanded={false}
          >
            <CardHeader
              title={comment.authorName}
              subtitle={this._timeSince(comment.createdAt)}
              actAsExpander={!!currentUser}
              showExpandableButton={!!currentUser}
              avatar={
                <AuthorAvatar
                  authorId={comment.authorId}
                  authorName={comment.authorName}
                  avatarUploaded={comment.avatarUploaded}
                />
              }
            />

            <CardText
              style={styles.commentMessage}
            >
              <MarkdownElement
                text={comment.message}
              />
            </CardText>

            <CardActions
              expandable={true}
              style={styles.cardStyle}
            >
              {cardButtons}
            </CardActions>
          </Card>
        );
      });
    }

    return (
      <div style={styles.listWrapper}>
        {content}
        {showMoreButton}
      </div>
    );
  }


}  // End List

List.propTypes = {
  comments: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  commentsLoading: React.PropTypes.bool.isRequired,
  projectAuthorId: React.PropTypes.string.isRequired,
  reply: React.PropTypes.func.isRequired,
  edit: React.PropTypes.func.isRequired,
  moreComments: React.PropTypes.bool.isRequired,
  limit: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object,
};

const styles = {
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '35px',
  },
  commentsCard: {
    paddingTop: '7px',
  },
  editComments: {
    padding: '0px',
  },
  commentsMessage: {
    paddingTop: '0px',
  },
  showMoreButton: {
    marginTop: '15px',
    marginBottom: '35px',
    alignSelf: 'center',
  },
  ShowMoreLabel: {
    fontFamily: 'spacemanFont',
  },
};
