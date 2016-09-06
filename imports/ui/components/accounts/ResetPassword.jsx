import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import InputField from '../../helpers/InputField';
import { PageError } from '../../helpers/PageError';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ActionLock from 'material-ui/svg-icons/action/lock';
import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';
import { greenA400 } from 'material-ui/styles/colors';

export default class ResetPassword extends React.Component {
  constructor() {
    super();

    // Autobind
    this._handleDialogClose = this._handleDialogClose.bind(this);
    this._handleReset = this._handleReset.bind(this);
    // Initial State
    this.state = {
      showDialog: false,
    };
  } // End constructor

  _handleDialogClose() {
    FlowRouter.go('/');
  }

  _handleReset() {
    const password = this.refs.password.getValue();
    const confirm = this.refs.confirm.getValue();
    const passwordOK = this.refs.password.validate();
    const confirmOK = this.refs.confirm.validate();

    if (password !== confirm) {
      this.refs.confirm.setErrorText('Passwords do not match.');
      // Display snackbar
      this.context.showSnackbar('Please fix the errors above.');
    } else if (!passwordOK || !confirmOK) {
      // Display snackbar
      this.context.showSnackbar('Please fix the errors above.');
    } else {
      // Reset Password
      Accounts.resetPassword(this.props.token, password, (error) => {
        if (error) {
          // Error -- Can't use Meteor.loggingIn in parent
          // because the callback could fire during an unmount
          this.context.showSnackbar(error.reason);
        } else {
          // Password reset
          this.setState({ showDialog: true });
        }
      });
    }
  }

  render() {
    let customActions = [
      <FlatButton
        key={0}
        label="Close"
        primary={true}
        onTouchTap={this._handleDialogClose}
      />,
    ];

    let content = null;
    if (!this.props.token) {
      content = <PageError errorMessage="Sorry reset token is invalid." />;
    } else {
      content = (
        <Paper zDepth={2} style={styles.joinWrapper}>
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
            onEnterKeyDown={this._handleReset}
          >
            <ActionLock color="Grey" />
          </InputField>

          <div style={styles.buttons}>
            <RaisedButton
              style={styles.loginButton}
              label="Reset Password"
              primary={true}
              onTouchTap={this._handleReset}
            />
          </div>
          <Dialog
            title="Password Reset"
            open={this.state.showDialog}
            actions={customActions}
            onRequestClose={this.__handleDialogClose}
          >
            <CommunicationVpnKey color={greenA400} />
            <p>Your password has been successfully changed.</p>
          </Dialog>
        </Paper>);
    }

    return (
      <div>
        {content}
      </div>
    );
  }

}  // End ResetPassword

ResetPassword.propTypes = {
  token: React.PropTypes.string.isRequired,
};

ResetPassword.contextTypes = {
  showSnackbar: React.PropTypes.func,
};

const styles = {
  joinWrapper: {
    marginTop: '20px',
    padding: '0px 20px 0px 20px',
    minHeight: '250px',
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
