import React from 'react';
import { edit } from '../../../api/news/methods';
import InputField from '../../helpers/InputField';
import InputMarkdown from '../../helpers/markdown/InputMarkdown';
import { Schema } from '../../../api/news/news';
import { Loading } from '../../helpers/Loading';
import { PageError } from '../../helpers/PageError';
import myTheme from '../../themes/myTheme.js';

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ActionLabel from 'material-ui/svg-icons/action/label';

export default class Edit extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleSubmit = this._handleSubmit.bind(this);
  }  // End constructor

  _handleSubmit() {
    const projectId = this.props.projectId;

    const subject = this.refs.subject.getValue();
    const message = this.refs.message.getValue();

    const subjectOK = this.refs.subject.validate();
    const messageOK = this.refs.message.validate();

    if (!subjectOK || !messageOK) {
			// Display snackbar
      this.context.showSnackbar('Please fix the errors above.');
    } else {
      edit.call({
        newsId: this.props.news._id,
        projectId,
        subject,
        message },
        (error) => {
          if (error) {
            // Error
            this.context.showSnackbar(`Failed to edit news.  ${error.message}`);
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
    if (this.props.loggingIn) {
      // Loading
      content = <Loading />;
    } else if (!currentUser) {
      // Not logged in
      content = <PageError errorMessage="You must be logged in to access this page." />;
    } else if (! this.props.projectId || ! this.props.news._id) {
      // Project Not found
      content = <PageError errorMessage="Project page not found." />;
    } else if (currentUser._id !== this.props.authorId) {
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
              <h3 style={subjectStyle}>Edit News</h3>
            </div>
            <InputField
              ref="subject"
              defaultValue={this.props.news.subject}
              fieldName="Subject"
              floatingLabelText="Subject"
              hintText="Enter subject."
              required={true}
              minLength={Schema.subject.min}
              maxLength={Schema.subject.max}
            >
              <ActionLabel color="Grey" />
            </InputField>
            <InputMarkdown
              ref="message"
              defaultValue={this.props.news.message}
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
  news: React.PropTypes.object.isRequired,
  projectId: React.PropTypes.string.isRequired,
  authorId: React.PropTypes.string.isRequired,
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
