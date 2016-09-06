import React from 'react';
import myTheme from '../../themes/myTheme.js';

import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

export const Email = (props) => {
  const emailStyle = { color: myTheme.palette.primary1Color };
  return (
    <div style={styles.emailWrapper}>
      <CommunicationEmail color="Grey" style={styles.emailIcon} />
      <span style={emailStyle}>
        {props.email}
      </span>
      <IconButton
        tooltip="Edit Email"
        tooltipPosition="top-right"
        onTouchTap={props.handleEditEmail}
      >
        <ImageEdit />
      </IconButton >
    </div>
  );
};  // End Email

Email.propTypes = {
  email: React.PropTypes.string.isRequired,
  handleEditEmail: React.PropTypes.func.isRequired,
};

const styles = {
  emailWrapper: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
  },

  emailIcon: {
    marginRight: '5px',
  },
};
