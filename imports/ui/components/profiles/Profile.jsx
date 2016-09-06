/* eslint-disable meteor/no-session */
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { updateProfile, setAvatarUploaded } from '../../../api/users/methods';

import { AvatarFrame } from './AvatarFrame';
import ChangeAvatar from './ChangeAvatar';
import ChangeEmail from './ChangeEmail';
import { Email } from './Email';
import Notifications from './Notifications';
import InputField from '../../helpers/InputField';
import { Loading } from '../../helpers/Loading';
import PageError from '../../helpers/PageError';
import myTheme from '../../themes/myTheme.js';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import SocialPublic from 'material-ui/svg-icons/social/public';

export default class Profile extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleAvatarUploaded = this._handleAvatarUploaded.bind(this);
    this._handleAvatarCancelled = this._handleAvatarCancelled.bind(this);
    this._handleChangeEmailClose = this._handleChangeEmailClose.bind(this);
    this._handleEditAvatar = this._handleEditAvatar.bind(this);
    this._handleEditEmail = this._handleEditEmail.bind(this);
    this._handleSave = this._handleSave.bind(this);

    // Initial State
    this.state = {
      showDialog: false,
      edittingAvatar: false,
    };
  }  // End constructor

  componentWillMount() {
    if (!this.context.loggingIn && !this.context.currentUser) {
      // Redirect to logon if no current user
      // Does not catch if logout called from console
      Session.set('redirect', 'profile');
      FlowRouter.redirect('/login');
    }
  }

  _handleAvatarUploaded() {
    // Display upload Avatar screen
    setAvatarUploaded.call((error) => {
      if (error) {
          // Error message
        this.context.showSnackbar(error.message);
      } else {
        // Pause to allow image to update
        setTimeout(() => {
          this.setState({ edittingAvatar: false });
        }, 100);
      }
    });
  }

  _handleAvatarCancelled() {
    this.setState({ edittingAvatar: false });
  }

  _handleChangeEmailClose() {
    // Close dialog to edit email address
    this.setState({ showDialog: false });
  }

  _handleEditAvatar() {
    // Display upload Avatar screen
    this.setState({ edittingAvatar: true });
  }

  _handleEditEmail() {
    // Open dialog to edit email address
    this.setState({ showDialog: true });
  }

  _handleSave() {
    const location = this.refs.location.getValue();
    const website = this.refs.website.getValue();
    const notifications = this.refs.notifications.isToggled();
    const locationOK = this.refs.location.validate();
    const websiteOK = this.refs.website.validate();

    if (!locationOK || !websiteOK) {
      // Display snackbar
      this.context.showSnackbar('Please fix the errors above.');
    } else {
      // Update profile
      updateProfile.call({
        location,
        website,
        notifications,
      }, (error) => {
        if (error) {
          // Error message
          this.context.showSnackbar(error.message);
        } else {
          // OK message
          this.context.showSnackbar('Changes Successfully Saved.');
        }
      });
    }
  }

  render() {
    const userStyle = { color: myTheme.palette.primary2Color };
    const currentUser = this.context.currentUser;

    let content = null;
    if (this.context.loggingIn) {
      content = <Loading />;
    } else if (!currentUser) {
      content = <PageError errorMessage="You must be logged in to access this page." />;
    } else if (this.state.edittingAvatar) {
      // Editing Avatar
      content = (<ChangeAvatar
        slingshot="avatarUpload"
        onSuccess={this._handleAvatarUploaded}
        onCancel={this._handleAvatarCancelled}
      />);
    } else {
      content = (
        <Paper
          zDepth={2}
          style={styles.profileWrapper}
        >
          <h2 style={userStyle}>{currentUser.username}</h2>
          <AvatarFrame
            handleEditAvatar={this._handleEditAvatar}
          />
          <InputField
            ref="location"
            fieldName="Location"
            floatingLabelText="Location"
            hintText="enter location"
            maxLength={35}
            defaultValue={currentUser.profile.location}
          >
            <MapsPlace color="Grey" />
          </InputField>
          <InputField
            ref="website"
            fieldName="Website"
            floatingLabelText="Website"
            hintText="enter your website"
            maxLength={35}
            defaultValue={currentUser.profile.website}
          >
            <SocialPublic color="Grey" />
          </InputField>
          <Email
            email={currentUser.emails[0].address}
            handleEditEmail={this._handleEditEmail}
          />
          <Notifications
            ref="notifications"
            notifications={currentUser.profile.sendNotifications}
          />
          <RaisedButton
            style={styles.saveButton}
            label="Save Changes"
            primary={true}
            onTouchTap={this._handleSave}
          />
          <ChangeEmail
            showDialog={this.state.showDialog}
            handleChangeEmailClose={this._handleChangeEmailClose}
          />
        </Paper>);
    }

    return (
      <div>
        {content}
      </div>
		);
  }

}  // End Profile

Profile.contextTypes = {
  currentUser: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
  showSnackbar: React.PropTypes.func,
};

const styles = {
  profileWrapper: {
    marginTop: '20px',
    padding: '0px 20px 10px 20px',
    minHeight: '300px',
    minWidth: '330px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  saveButton: {
    marginTop: '15px',
    alignSelf: 'center',
  },
};
