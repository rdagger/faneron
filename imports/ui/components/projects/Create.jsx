/* eslint-disable meteor/no-session */
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';
import React from 'react';
import { confirmTitleUnique, create, GameCats } from '../../../api/projects/methods';
import myTheme from '../../themes/myTheme';
import InputField from '../../helpers/InputField';
import InputDropdown from '../../helpers/InputDropdown';
import { Loading } from '../../helpers/Loading';
import { PageError } from '../../helpers/PageError';

import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ActionLabel from 'material-ui/svg-icons/action/label';
import ActionList from 'material-ui/svg-icons/action/list';


export default class Create extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Redirect if not logged in
    if (!context.loggingIn && !context.currentUser) {
      // Redirect to logon if no current user
      // Does not catch if logout called from console
      Session.set('redirect', 'create');
      FlowRouter.redirect('/login');
    }

    // Autobind
    this._handleDialogClose = this._handleDialogClose.bind(this);
    this._handleCreateConfirmed = this._handleCreateConfirmed.bind(this);
    this._handleCreateGame = this._handleCreateGame.bind(this);

    // Initial State
    this.state = {
      category: '',
      categoryHint: 'enter game category',
      results: {},
      showDialog: false,
    };
  } // End Constructor

  _handleDialogClose() {
    this.setState({ showDialog: false });
  }

  _handleCreateConfirmed() {
    create.call({
      title: this.state.results.title,
      category: this.state.results.category,
    }, (error, result) => {
      // Close Dialog
      this.setState({ showDialog: false }, () => {
        if (error) {
          this.context.showSnackbar('Failed to create project.');
        } else {
          // Redirect to edit page after database insert
          const pathDef = '/edit/:projectId';
          const params = { projectId: result };
          FlowRouter.go(FlowRouter.path(pathDef, params));
        }
      });
    });
  }

  _handleCreateGame() {
    const title = this.refs.title.getValue();
    const category = this.refs.category.getValue();

    const titleOK = this.refs.title.validate();
    const categoryOK = this.refs.category.validate();

    if (!titleOK || !categoryOK) {
      // Display snackbar
      this.context.showSnackbar('Please fix the errors above.');
    } else {
      // Confirm title is not already userId
      confirmTitleUnique.call({ title }, (error, result) => {
        if (result) {
          // Create project
          this.setState({ results: { title, category } }, () => {
            this.setState({ showDialog: true });
          });
        } else {
          this.context.showSnackbar('Sorry, title has already been used.');
        }
      });
    }
  }

  render() {
    const currentUser = this.context.currentUser;
    let content = null;
    if (this.context.loggingIn) {
      content = <Loading />;
    } else if (!currentUser) {
      content = <PageError errorMessage="You must be logged in to access this page." />;
    } else {
      let categories = _.map(GameCats, (cat, idx) =>
        <MenuItem value={cat} key={idx} primaryText={cat} />
      );

      const saveButtonStyle = { color: myTheme.palette.primary2Color };
      let customActions = [
        <FlatButton
          key={0}
          label="Cancel"
          primary={true}
          onTouchTap={this._handleDialogClose}
        />,
        <FlatButton
          key={1}
          label="Create Game"
          labelStyle={saveButtonStyle}
          keyboardFocused={true}
          onTouchTap={this._handleCreateConfirmed}
        />,
      ];
      const titleStyle = { color: myTheme.palette.primary2Color };
      content = (
        <Paper zDepth={2} style={styles.createWrapper}>
          <div>
            <h3 style={titleStyle}>Create a New Game</h3>
            <InputField
              ref="title"
              fieldName="Title"
              floatingLabelText="Game Title"
              hintText="Enter game title."
              required={true}
              minLength={2}
              maxLength={35}
            >
              <ActionLabel color="Grey" />
            </InputField>
            <InputDropdown
              ref="category"
              fieldName="Category"
              floatingLabelText="Category"
              menuItems={categories}
              required={true}
            >
              <ActionList color="Grey" />
            </InputDropdown>
          </div>
          <RaisedButton
            style={styles.createButton}
            label="Create Game"
            primary={true}
            onTouchTap={this._handleCreateGame}
          />
          <Dialog
            title="Confirm New Game"
            actions={customActions}
            open={this.state.showDialog}
          >
            <p>
              Click <em>Create Game</em> to submit your new project.
  The next screen will allow you to upload cover art and provide a description and gameplay.
            </p>
          </Dialog>
        </Paper>
      );
    }
    return (
      <div>
        {content}
      </div>
		);
  }

} // End Create

Create.contextTypes = {
  currentUser: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
  showSnackbar: React.PropTypes.func,
};

const styles = {
  createWrapper: {
    marginTop: '20px',
    padding: '0px 20px 0px 20px',
    minHeight: '310px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  createButton: {
    margin: '20px 0px 20px 0px',
  },
};
