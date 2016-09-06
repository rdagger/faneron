// This is a pure render function
import { Meteor } from 'meteor/meteor';
import React from 'react';
import myTheme from '../../themes/myTheme.js';

import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

export const HeaderAvatar = (props, context) => {
  let accountIcon;
  let accountItems;
  let accountColor = myTheme.palette.primary2Color;
  const mobileState = context.mobileState;
  if (mobileState) {
    accountColor = myTheme.palette.primary1Color;
  }
  const currentUser = context.currentUser;
  if (currentUser) {
    // Set menu items for logged in
    accountItems = [
      <MenuItem index={0} target="/profile" key="profile">Profile</MenuItem>,
      <MenuItem index={1} target="/chat" key="chat">Chat</MenuItem>,
      <MenuItem index={2} key="logout">Log Out</MenuItem>,
    ];
    // Set menu icon
    const avatarUploaded = currentUser.profile.avatarUploaded;
    if (avatarUploaded.getTime()) {
      accountIcon = (
        <FloatingActionButton
          backgroundColor={accountColor}
          mini={true}
        >
          <img
            src={`${Meteor.settings.public.s3}/users/${context.currentUser._id}/avatar.jpg?ul=${
              avatarUploaded.getTime().toString()}`}
            alt="Avatar"
          />
        </FloatingActionButton>
      );
    } else {
      // Set menu icon to first initial
      const letter = currentUser.username.substr(0, 1).toUpperCase();
      accountIcon = (
        <Avatar
          backgroundColor="White"
          color={accountColor}
        >
          <b>{letter}</b>
        </Avatar>
      );
    }
  } else {
    // Set menu items for logged out
    let iconStyle = null;
    if (mobileState) {
      iconStyle = { marginTop: '12px' };
    }
    accountItems = [
      <MenuItem index={0} target="/login" key="login">Login</MenuItem>,
      <MenuItem index={1} target="/join" key="join">Join</MenuItem>,
    ];
    // Set menu icon to generic
    accountIcon = <ActionAccountCircle color="White" style={iconStyle} />;
  }

  return (
    <IconMenu
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onItemTouchTap={props.menuTap}
      touchTapCloseDelay={10}
      style={styles.accountMenu}
      iconButtonElement={accountIcon}
    >
      {accountItems}
    </IconMenu>
	);
}; // End HeaderAvatar

// Prop Types
HeaderAvatar.propTypes = {
  menuTap: React.PropTypes.func,
};

// Context Types
HeaderAvatar.contextTypes = {
  currentUser: React.PropTypes.object,
  mobileState: React.PropTypes.bool,
};

const styles = {
  accountMenu: {
    marginLeft: '20px',
    marginRight: '20px',
  },
};
