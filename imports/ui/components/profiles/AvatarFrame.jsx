import { Meteor } from 'meteor/meteor';
import React from 'react';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';

export const AvatarFrame = (props, context) => {
  const currentUser = context.currentUser;
  let source = null;
  let letter = null;
  const avatarUploaded = currentUser.profile.avatarUploaded;
  if (avatarUploaded.getTime()) {
    source = `${Meteor.settings.public.s3}/users/${currentUser._id}/avatar.jpg?ul=${
      avatarUploaded.getTime().toString()}`;
  } else {
    letter = currentUser.username.substr(0, 1);
  }

  return (
    <div>
      <Avatar
        size={80}
        src={source}
      >
      {letter}
      </Avatar>
      <IconButton
        tooltip="Edit Avatar"
        tooltipPosition="top-right"
        onTouchTap={props.handleEditAvatar}
      >
        <ImageEdit />
      </IconButton >
    </div>
	);
};  // End AvatarFrame

AvatarFrame.propTypes = {
  handleEditAvatar: React.PropTypes.func.isRequired,
};

AvatarFrame.contextTypes = {
  currentUser: React.PropTypes.object,
};
