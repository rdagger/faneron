import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import InputField from '../../helpers/InputField';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import ActionLock from 'material-ui/svg-icons/action/lock';

export default class Login extends React.Component {
  constructor() {
    super();

    // Autobind
    this._handleLogin = this._handleLogin.bind(this);
    this._handleForgotPassword = this._handleForgotPassword.bind(this);
    this._handleSnackbarClose = this._handleSnackbarClose.bind(this);

    // Initial State
    this.state = {
      snackbarMessage: 'Error',
      snackbarOpen: false,
    };
  } // End constructor

  _handleLogin() {
    const email = this.refs.email.getValue();
    const password = this.refs.password.getValue();

    const emailOK = this.refs.email.validate();
    const passwordOK = this.refs.password.validate();

    if (!emailOK || !passwordOK) {
      // Display snackbar
      this.setState({ snackbarMessage: 'Please fix the errors above.' }, () => {
        this.setState({ snackbarOpen: true });
      });
    } else {
      // Login
      Meteor.loginWithPassword(email, password,
        (error) => {
          if (error) {
            // Display snackbar -- Can't use Meteor.loggingIn in parent
            // because the callback could fire during an unmount
            this.setState({ snackbarMessage: 'Invalid credentials.' }, () => {
              this.setState({ snackbarOpen: true });
            });
          }
        }
      );
    }
  }

  _handleForgotPassword() {
    FlowRouter.go(FlowRouter.path('forgotPassword'));
  }

  _handleSnackbarClose() {
    this.setState({ snackbarOpen: false });
  }

  render() {
    return (
      <Paper zDepth={2} style={styles.loginWrapper}>
        <InputField
          ref="email"
          fieldName="Email"
          hintText="enter email"
          floatingLabelText="Email"
          required={true}
          email={true}
          onEnterKeyDown={this._handleLogin}
        >
          <CommunicationEmail color="Grey" />
        </InputField>

        <InputField
          ref="password"
          fieldName="Password"
          hintText="enter password"
          floatingLabelText="Password"
          type="password"
          required={true}
          onEnterKeyDown={this._handleLogin}
        >
          <ActionLock color="Grey" />
        </InputField>

        <div id="toggle" style={styles.buttons}>
          <RaisedButton
            ref="loginButton"
            style={styles.loginButton}
            label="Login"
            primary={true}
            onTouchTap={this._handleLogin}
          />
          <br />
          <a href="/join">Need an account? Join Now.</a>
        </div>
        <Snackbar
          ref="snackbar"
          message={this.state.snackbarMessage}
          open={this.state.snackbarOpen}
          action="Forgot Password"
          onActionTouchTap={this._handleForgotPassword}
          onRequestClose={this._handleSnackbarClose}
        />
      </Paper>
    );
  }

}  // End of Login

Login.propTypes = {
  redirect: React.PropTypes.string,
};

const styles = {
  loginWrapper: {
    marginTop: '20px',
    padding: '0px 20px 0px 20px',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttons: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: '30px',
  },

  loginButton: {
    marginBottom: '10px',
  },
};
