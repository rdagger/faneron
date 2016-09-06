import React from 'react';
import { edit } from '../../../api/comments/methods';
import InputMarkdown from '../../helpers/markdown/InputMarkdown';
import { Loading } from '../../helpers/Loading';
import { PageError } from '../../helpers/PageError';
import myTheme from '../../themes/myTheme.js';

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

export default class Edit extends React.Component {
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
      edit.call({ commentId: this.props.comment._id, message },
        (error) => {
          if (error) {
            // Error
            this.context.showSnackbar(`Failed to edit comment.  ${error.message}`);
          } else {
            this.props.close();
          }
        });
    }
  }

  render() {
    const currentUser = this.props.currentUser;
    let content = null;
    if (this.props.loggingIn) {
      // Loading
      content = <Loading />;
    } else if (!currentUser) {
      // Not logged in
      content = <PageError errorMessage="You must be logged in to access this page." />;
    } else if (! this.props.comment._id) {
      // Project Not found
      content = <PageError errorMessage="Project page not found." />;
    } else if (currentUser._id !== this.props.comment.authorId) {
      // Not authorized
      content = <PageError errorMessage="You are not authorized to access this page." />;
    } else {
      const subjectStyle = { color: myTheme.palette.primary2Color };
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
              <h3 style={subjectStyle}>Edit Comment</h3>
            </div>
            <InputMarkdown
              ref="message"
              defaultValue={this.props.comment.message}
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

}  // End Edit

Edit.propTypes = {
  comment: React.PropTypes.object.isRequired,
  close: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
};

Edit.contextTypes = {
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
