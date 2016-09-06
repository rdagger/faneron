import React from 'react';
import myTheme from '../../themes/myTheme';
import { flag, remove } from '../../../api/comments/methods';

import FlagButton from './FlagButton';
import ReplyButton from './ReplyButton';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';

export default class CardButtons extends React.Component {
  constructor() {
    super();
    // Autobind
    this._flagComment = this._flagComment.bind(this);
    this._handleConfirmRemove = this._handleConfirmRemove.bind(this);
    this._handleCommentEdit = this._handleCommentEdit.bind(this);
    this._handleCommentFlag = this._handleCommentFlag.bind(this);
    this._handleCommentReply = this._handleCommentReply.bind(this);
    this._removeComment = this._removeComment.bind(this);
  }  // End constructor

  _flagComment() {
    const commentId = this.props.comment._id;
    if (commentId) {
      flag.call({ commentId },
        (error) => {
          if (error) {
            // Error
            this.context.showSnackbar(`Failed to flag comment.  ${error.message}`);
          } else {
            this.context.showSnackbar('Comment flagged for abuse.');
          }
        }
      );
    }
  }

  _handleConfirmRemove() {
    this.context.showConfirm('Do you wish to permanently delete this comment?',
      this._removeComment);
  }


  _handleCommentFlag(commentId) {
    if (commentId) {
      if (this.props.comment.abuse) {
        this.context.showSnackbar('This comment has already been flagged for abuse.');
      } else {
        this.context.showConfirm('Are you sure you wish to flag this comment for abuse or SPAM?',
          this._flagComment);
      }
    }
  }

  _handleCommentReply(authorName) {
    this.props.reply(authorName);
  }

  _handleCommentEdit() {
    this.props.edit({
      _id: this.props.commentId,
      message: this.props.message,
      authorId: this.props.authorId,
    });
  }

  _removeComment() {
    const commentId = this.props.comment._id;
    if (commentId) {
      remove.call({ commentId },
        (error) => {
          if (error) {
            // Error
            this.context.showSnackbar(`Failed to remove comment.  ${error.message}`);
          }
        }
      );
    }
  }

  render() {
    const currentUser = this.props.currentUser;
    const comment = this.props.comment;
    let cardButtons = [];

    if (currentUser && comment) {
			// Reply button
      if (currentUser._id !== comment.authorId) {
        cardButtons.push(
          <ReplyButton
            key="reply"
            authorName={comment.authorName}
            handleReply={this._handleCommentReply}
          />
				);
      }

			// Edit button
      if (currentUser._id === comment.authorId) {
        cardButtons.push(
          <IconButton
            tooltip="Edit Comment"
            key="edit"
            tooltipPosition="top-right"
            onTouchTap={this._handleCommentEdit}
          >
            <ImageEdit color="Gray" />
          </IconButton >
				);
      }

			// Delete button
      if (currentUser._id === comment.authorId || currentUser._id === this.props.projectAuthorId) {
        cardButtons.push(
          <IconButton
            tooltip="Remove Comment"
            key="remove"
            tooltipPosition="top-right"
            onTouchTap={this._handleConfirmRemove}
          >
            <ActionDelete color="Gray" />
          </IconButton >
        );
      }

      // Flag button
      const flagColor = comment.abuse ? myTheme.palette.primary2Color : 'Gray';
      const flagTip = comment.abuse ? 'Flagged for abuse' : 'Flag for Abuse';
      if (currentUser._id !== comment.authorId || comment.abuse === true) {
        cardButtons.push(
          <FlagButton
            commentId={comment._id}
            flagColor={flagColor}
            flagTip={flagTip}
            key="flag"
            handleFlag={this._handleCommentFlag}
          />
        );
      }
    }

    return (
      <span>{cardButtons}</span>
    );
  }

}  // End CardButtons

CardButtons.propTypes = {
  comment: React.PropTypes.object.isRequired,
  projectAuthorId: React.PropTypes.string.isRequired,
  reply: React.PropTypes.func,	// Can't require functions because actions don't initially mount
  edit: React.PropTypes.func.isRequired,
  commentId: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired,
  authorId: React.PropTypes.string.isRequired,
  remove: React.PropTypes.func,
  flag: React.PropTypes.func,
  currentUser: React.PropTypes.object,
};

CardButtons.contextTypes = {
  showSnackbar: React.PropTypes.func,
  showConfirm: React.PropTypes.func,
};
