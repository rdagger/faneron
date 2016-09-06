import React from 'react';
import { add } from '../../../api/comments/methods';
import InputMarkdown from '../../helpers/markdown/InputMarkdown';
import { Loading } from '../../helpers/Loading';
import { PageError } from '../../helpers/PageError';
import myTheme from '../../themes/myTheme.js';

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

export default class Add extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleSubmit = this._handleSubmit.bind(this);
  }  // End constructor

  _handleSubmit() {
    const message = this.refs.message.getValue();
    const messageOK = this.refs.message.validate();

    if (!messageOK) {
      // Display snackbar
      this.context.showSnackbar('Please fix the errors above.');
    } else {
      add.call({ projectId: this.props.projectId, message },
        (error) => {
          if (error) {
            // Error
            this.context.showSnackbar(`Failed to add comment.  ${error.message}`);
          } else {
            this.props.close();
          }
        }
      );
    }
  }

  render() {
    const currentUser = this.props.currentUser;
    let content = null;
    if (this.context.loggingIn) {
      // Loading
      content = <Loading />;
    } else if (!currentUser) {
      // Not logged in
      content = <PageError errorMessage="You must be logged in to access this page." />;
    } else if (! this.props.projectId) {
      // Project Not found
      content = <PageError errorMessage="Project page not found." />;
    } else {
      const headingStyle = { color: myTheme.palette.primary2Color };
      const wrapperStyle = {
        minWidth: Math.min(document.body.clientWidth, 700),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      };
      content = (
        <div style={wrapperStyle}>
          <div>
            <div style={styles.header}>
              <IconButton
                style={styles.cancelButton}
                tooltip="Cancel"
                tooltipPosition="bottom-center"
                onTouchTap={this.props.close}
              >
                <NavigationArrowBack color="Black" />
              </IconButton>
              <h3 style={headingStyle}>Add Comment</h3>
            </div>
            <InputMarkdown
              ref="message"
              defaultValue={this.props.replyName}
              fieldName="Message"
              floatingLabelText="Message"
              fullWidth={true}
              hintText="Enter message."
              required={true}
            />
          </div>
          <RaisedButton
            style={styles.submitButton}
            label="Submit"
            primary={true}
            onTouchTap={this._handleSubmit}
          />
        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }

}  // End Add

Add.propTypes = {
  projectId: React.PropTypes.string.isRequired,
  replyName: React.PropTypes.string,
  close: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
};

Add.contextTypes = {
  showSnackbar: React.PropTypes.func,
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
  },

  submitButton: {
    margin: '25px 0px 15px 0px',
    alignSelf: 'center',
  },
};
