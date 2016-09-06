import { Meteor } from 'meteor/meteor';
import React from 'react';
import InputField from '../../helpers/InputField';
import myTheme from '../../themes/myTheme.js';
import { changeEmail } from '../../../api/users/methods';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

export default class ChangeEmail extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleChangeEmailSave = this._handleChangeEmailSave.bind(this);
  }  // End constructor

  _handleChangeEmailSave() {
    const newEmail = this.refs.email.getValue();
    const confirmEmail = this.refs.confirmEmail.getValue();
    // Validate emails
    const emailOK = this.refs.email.validate();
    const confirmEmailOK = this.refs.confirmEmail.validate();
    if (! emailOK || ! confirmEmailOK) {
      // Emails missing or invalid
      this.context.showSnackbar('Please fix the errors above.');
    } else if (newEmail !== confirmEmail) {
      // Emails don't match
      this.context.showSnackbar('Email addresses do not match.');
    } else {
			// Change email
      changeEmail.call({
        newEmail,
      }, (error) => {
        if (error) {
          // Error
          this.context.showSnackbar(`Failed: ${error.message}`);
        } else {
          // Email succesfully changed
          this.props.handleChangeEmailClose();
        }
      });
    }
  }

  render() {
    const saveButtonStyle = { color: myTheme.palette.primary1Color };
    let customActions = [
      <FlatButton
        key={0}
        label="Cancel"
        onTouchTap={this.props.handleChangeEmailClose}
      />,
      <FlatButton
        key={1}
        label="Save"
        labelStyle={saveButtonStyle}
        onTouchTap={this._handleChangeEmailSave}
      />,
    ];

    return (
      <Dialog
        title="Change Email Address"
        actions={customActions}
        open={this.props.showDialog}
        onRequestClose={this.props.handleChangeEmailClose}
      >
        <InputField
          ref="email"
          fieldName="Email"
          hintText="enter email"
          required={true}
          email={true}
          maxLength={50}
        >
          <CommunicationEmail color="Grey" />
        </InputField>
        <InputField
          ref="confirmEmail"
          fieldName="ConfirmEmail"
          hintText="confirm email"
          required={true}
          email={true}
          maxLength={50}
          onEnterKeyDown={this._handleChangeEmailSave}
        >
          <CommunicationEmail color="Grey" />
        </InputField>
      </Dialog>
		);
  }

}  // End changeEmail

ChangeEmail.propTypes = {
  showDialog: React.PropTypes.bool.isRequired,
  handleChangeEmailClose: React.PropTypes.func,
};

ChangeEmail.contextTypes = {
  currentUser: React.PropTypes.object,
  showSnackbar: React.PropTypes.func,
};
