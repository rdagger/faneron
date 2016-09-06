import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentReply from 'material-ui/svg-icons/content/reply';

export default class ReplyButton extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleReply = this._handleReply.bind(this);
  }  // End constructor


  _handleReply() {
    const authorName = this.props.authorName;
    this.props.handleReply(`@${authorName} `);
  }

  render() {
    return (
      <IconButton
        tooltip="Reply"
        key="reply"
        tooltipPosition="top-right"
        onTouchTap={this._handleReply}
      >
        <ContentReply color="Gray" />
      </IconButton >
    );
  }
}  // End ReplyButton

ReplyButton.propTypes = {
  authorName: React.PropTypes.string.isRequired,
  handleReply: React.PropTypes.func.isRequired,
};
