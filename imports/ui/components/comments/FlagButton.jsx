import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentFlag from 'material-ui/svg-icons/content/flag';

export default class FlagButton extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleFlag = this._handleFlag.bind(this);
  }  // End constructor


  _handleFlag() {
    this.props.handleFlag(this.props.commentId);
  }

  render() {
    return (
      <IconButton
        tooltip={this.props.flagTip}
        key="flag"
        tooltipPosition="top-right"
        onTouchTap={this._handleFlag}
      >
        <ContentFlag color={this.props.flagColor} />
      </IconButton >
    );
  }
}  // End FlagButton

FlagButton.propTypes = {
  commentId: React.PropTypes.string.isRequired,
  flagColor: React.PropTypes.string.isRequired,
  flagTip: React.PropTypes.string.isRequired,
  handleFlag: React.PropTypes.func.isRequired,
};
