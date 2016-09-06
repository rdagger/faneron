import React from 'react';
import myTheme from '../../themes/myTheme.js';

import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import SocialNotifications from 'material-ui/svg-icons/social/notifications';

export default class Notifications extends React.Component {
  constructor() {
    super();
    // Autobind
    this.isToggled = this.isToggled.bind(this);
  }  // End constructor

  isToggled() {
    // return this.isMounted() ? this.refs.sendNotifications.isToggled() : undefined;
    return this.refs.sendNotifications.isToggled();
  }

  render() {
    const labelStyle = { color: myTheme.palette.primary1Color };
    return (
      <div style={styles.notificationsWrapper}>
        <IconButton
          style={styles.notificationsIcon}
          tooltip="Receive notifications when a user comments or replies to your posts."
          tooltipPosition="top-right"
        >
          <SocialNotifications color="Grey" />
        </IconButton>
        <Toggle
          ref="sendNotifications"
          style={styles.notificationToggle}
          label="Receive Email Notifications"
          labelStyle={labelStyle}
          defaultToggled={this.props.notifications}
        />
      </div>
		);
  }
}  // End Notifications

Notifications.propTypes = {
  notifications: React.PropTypes.bool.isRequired,
};

const styles = {
  notificationsWrapper: {
    margin: '15px 0px 0px 0px',
    display: 'inline-flex',
  },

  notificationsIcon: {
    width: 'auto',
    height: 'auto',
    padding: '0px',
    margin: '0px 5px 0px 0px',
  },

  notificationToggle: {
    display: 'inline-block',
    marginTop: '0px',
  },
};
