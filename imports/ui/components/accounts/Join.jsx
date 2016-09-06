import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import InputField from '../../helpers/InputField';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ActionLock from 'material-ui/svg-icons/action/lock';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import SocialPerson from 'material-ui/svg-icons/social/person';

export default class Join extends React.Component {
  constructor() {
    super();

    // Autobind
    this._handleJoin = this._handleJoin.bind(this);
  } // End constructor

  _handleJoin() {
    const username = this.refs.username.getValue();
    const email = this.refs.email.getValue().toLowerCase();
    const password = this.refs.password.getValue();
    const confirm = this.refs.confirm.getValue();

    const usernameOK = this.refs.username.validate();
    const emailOK = this.refs.email.validate();
    const passwordOK = this.refs.password.validate();
    const confirmOK = this.refs.confirm.validate();

    if (password !== confirm) {
      this.context.showSnackbar('Passwords do not match.');
    } else if (!usernameOK || !emailOK || !passwordOK || !confirmOK) {
      // Display snackbar
      this.context.showSnackbar('Please fix the errors above.');
    } else {
      // Join
      Accounts.createUser({
        username,
        email,
        password,
      }, (error) => {
        if (error) {
          let errorMessage = 'Please fix the errors above.';
          // Error -- Can't use Meteor.loggingIn in parent
          // because the callback could fire during an unmount
          if (error.reason === 'Username already exists.') {
            this.refs.username.setErrorText('Username is already taken.');
          } else if (error.reason === 'Email already exists.') {
            this.refs.email.setErrorText('Email address is already taken.');
          } else {
            errorMessage = error.reason;
          }
          // Display snackbar
          this.context.showSnackbar(errorMessage);
        } else {
          // User added
          FlowRouter.go(FlowRouter.path('profile'));
        }
      });
    }
  }

  render() {
    return (
      <Paper zDepth={2} style={styles.joinWrapper}>
        <InputField
          ref="username"
          fieldName="Username"
          hintText="enter username"
          required={true}
          minLength={2}
          maxLength={25}
        >
          <SocialPerson color="Grey" />
        </InputField>

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
          ref="password"
          fieldName="Password"
          hintText="enter password"
          type="password"
          required={true}
          minLength={8}
          maxLength={21}
        >
          <ActionLock color="Grey" />
        </InputField>

        <InputField
          ref="confirm"
          fieldName="Confirm"
          hintText="confirm password"
          type="password"
          required={true}
          minLength={8}
          maxLength={21}
          onEnterKeyDown={this._handleJoin}
        >
          <ActionLock color="Grey" />
        </InputField>

        <div style={styles.buttons}>
          <RaisedButton
            style={styles.loginButton}
            label="Join"
            primary={true}
            onTouchTap={this._handleJoin}
          />
          <br />
          <a href="/login">Have an account? Login.</a>
        </div>
      </Paper>
    );
  }
}
// End Join

Join.contextTypes = {
  showSnackbar: React.PropTypes.func,
};

const styles = {
  joinWrapper: {
    marginTop: '20px',
    padding: '0px 20px 0px 20px',
    minHeight: '330px',
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
    marginTop: '10px',
    marginBottom: '10px',
  },
};
