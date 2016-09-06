// This is a pure render function
import { Meteor } from 'meteor/meteor';
import React from 'react';
import myTheme from '../../themes/myTheme';

import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export const AuthorAvatar = (props) => {
  let avatar = null;
  const avatarUploaded = props.avatarUploaded;
  if (avatarUploaded && avatarUploaded.getTime()) {
    avatar = (
      <FloatingActionButton
        backgroundColor={myTheme.palette.primary2Color}
        mini={true}
      >
        <img
          src={`${Meteor.settings.public.s3}/users/${props.authorId}/avatar.jpg?ul=${
            avatarUploaded.getTime().toString()}`}
          alt="Avatar"
        />
      </FloatingActionButton>
    );
  } else {
    // Set menu icon to first initial
    const letter = props.authorName.substr(0, 1).toUpperCase();
    avatar = (
      <Avatar
        backgroundColor={myTheme.palette.primary2Color}
        color="White"
        size={30}
      >
        <b>{letter}</b>
      </Avatar>
    );
  }

  return (
    <span style={styles.avatarWrapper}>
      {avatar}
    </span>);
};  // End AuthorAvatar


AuthorAvatar.propTypes = {
  authorId: React.PropTypes.string.isRequired,
  authorName: React.PropTypes.string.isRequired,
  avatarUploaded: React.PropTypes.instanceOf(Date),
};

const styles = {
  avatarWrapper: {
    marginRight: '10px',
  },
};
