// This is a pure render function
import React from 'react';

import myTheme from '../themes/myTheme.js';

import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export const ConfirmationDialog = (props) => {
  const yesButtonStyle = { color: myTheme.palette.primary2Color };
  let customActions = [
    <FlatButton
      key={0}
      label="Cancel"
      primary={true}
      keyboardFocused={true}
      onTouchTap={props.onClose}
    />,
    <FlatButton
      key={1}
      label="Yes"
      labelStyle={yesButtonStyle}
      onTouchTap={props.onConfirm}
    />,
  ];

  const dialogTitle = (
    <span style={styles.avatarWrapper}>
      <h2>CONFIRM</h2>
      <Avatar
        backgroundColor={myTheme.palette.primary2Color}
        style={styles.titleAvatar}
      >
        <b>?</b>
      </Avatar>
    </span>
  );

  return (
    <Dialog
      title={dialogTitle}
      actions={customActions}
      onRequestClose={props.onClose}
      open={props.show}
    >
      <p>{props.message}</p>
    </Dialog>
	);
};  // End ConfirmationDialog

ConfirmationDialog.propTypes = {
  message: React.PropTypes.string.isRequired,
  show: React.PropTypes.bool,
  onConfirm: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
};

ConfirmationDialog.defaultProps = {
  show: false,
};


const styles = {
  avatarWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    marginLeft: '20px',
  },

  titleAvatar: {
    margin: '10px 0px 0px 20px',
  },
};
