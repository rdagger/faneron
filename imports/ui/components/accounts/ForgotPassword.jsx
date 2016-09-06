import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import InputField from '../../helpers/InputField';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

export default class ForgotPassword extends React.Component {
  constructor() {
    super();

    // Autobind
    this._handleSendResetLink = this._handleSendResetLink.bind(this);

    // Initial State
    this.state = {
      resetButtonEnable: false,
    };
  } // End constructor

  _handleSendResetLink() {
    const email = this.refs.email.getValue();
    const emailOK = this.refs.email.validate();

    if (!emailOK) {
      // Display snackbar
      this.context.showSnackbar('Please fix the errors above.');
    } else {
      // Reset Password
      Accounts.forgotPassword({ email }, (error) => {
        if (error) {
          // Display snackbar
          this.context.showSnackbar(`Unable to reset password:  ${error.reason}`);
          this.refs.email.setErrorText('Email address not found.');
        } else {
          this.setState({ resetButtonEnable: true });
          this.context.showSnackbar('A password reset email has been sent to you.');
        }
      });
    }
  }

  render() {
    return (
      <Paper zDepth={2} style={styles.resetWrapper}>
        <InputField
          ref="email"
          fieldName="Email"
          hintText="enter email"
          floatingLabelText="Email"
          required={true}
          email={true}
          onEnterKeyDown={this._handleSendResetLink}
        >
          <CommunicationEmail color="Grey" />
        </InputField>

        <div id="toggle" style={styles.buttons}>
          <RaisedButton
            ref="resetButton"
            disabled={this.state.resetButtonEnable}
            style={styles.resetButton}
            label="Send Reset Password Link"
            primary={true}
            onTouchTap={this._handleSendResetLink}
          />
          <br />
          <a href="/join">Need an account? Join Now.</a>
        </div>
      </Paper>
    );
  }
}  // End ForgotPassword

ForgotPassword.contextTypes = {
  showSnackbar: React.PropTypes.func,
};

const styles = {
  resetWrapper: {
    marginTop: '20px',
    padding: '0px 20px 0px 20px',
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: '30px',
  },

  resetButton: {
    marginBottom: '10px',
  },
};
