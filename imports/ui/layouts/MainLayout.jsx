import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';

import DesktopHeader from '../components/headers/DesktopHeader';
import MobileHeader from '../components/headers/MobileHeader';
import { ConfirmationDialog } from '../helpers/ConfirmationDialog';
import myTheme from '../themes/myTheme.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class MainLayout extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleConfirmClose = this._handleConfirmClose.bind(this);
    this._handleConfirmYes = this._handleConfirmYes.bind(this);
    this._handleSnackbarClose = this._handleSnackbarClose.bind(this);
    this._setSearch = this._setSearch.bind(this);
    this._showConfirm = this._showConfirm.bind(this);
    this._showSnackbar = this._showSnackbar.bind(this);

    // Material UI Child Context
    this.constructor.childContextTypes = {
      currentUser: React.PropTypes.object,
      loggingIn: React.PropTypes.bool,
      muiTheme: React.PropTypes.object,
      mobileState: React.PropTypes.bool,
      search: React.PropTypes.string,
      setSearch: React.PropTypes.func,
      showSnackbar: React.PropTypes.func,
      showConfirm: React.PropTypes.func,
    };

    // Mobile State
    const widthChange = function(mq) {
      this.setState({ mobileState: !mq.matches });
    }.bind(this);

    //  Add listener to adjust mobile state on resize
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addListener(widthChange);

    // Initial State
    this.state = {
      currentUser: Meteor.user(),
      loggingIn: Meteor.loggingIn(),
      mobileState: !mediaQuery.matches,
      snackbarMessage: 'Error',
      snackbarOpen: false,
      confirmMessage: 'Error',
      confirmOpen: false,
      onConfirm: this._handleConfirmClose,
      search: null,
    };
  }  // End constructor

  getChildContext() {
    const newMuiTheme = getMuiTheme(myTheme);
    newMuiTheme.snackbar.backgroundColor = myTheme.palette.primary2Color;

    return {
      currentUser: this.state.currentUser,
      loggingIn: this.state.loggingIn,
      muiTheme: newMuiTheme,
      mobileState: this.state.mobileState,
      search: this.state.search,
      setSearch: this._setSearch,
      showSnackbar: this._showSnackbar,
      showConfirm: this._showConfirm,
    };
  }

  componentDidMount() {
    Tracker.autorun(() => {
      this.setState({ currentUser: Meteor.user() });
    });

    Tracker.autorun(() => {
      this.setState({ loggingIn: Meteor.loggingIn() });
    });
  }

  _handleConfirmClose() {
    this.setState({ confirmOpen: false });
  }

  _handleSnackbarClose() {
    this.setState({ snackbarOpen: false });
  }

  _handleConfirmYes() {
    this.setState({ confirmOpen: false }, () => {
      this.state.onConfirm();
    });
  }

  _setSearch(search, callback) {
    if (callback) {
      this.setState({ search }, callback);
    } else {
      this.setState({ search });
    }
  }

  _showConfirm(confirmMessage, onConfirm) {
    this.setState({ confirmMessage, onConfirm }, () => {
      this.setState({ confirmOpen: true });
    });
  }

  _showSnackbar(snackbarMessage) {
    this.setState({ snackbarMessage }, () => {
      this.setState({ snackbarOpen: true });
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
					{this.state.mobileState ? <MobileHeader /> : <DesktopHeader />}
        </div>
        <div style={styles.content}>
          <main>{this.props.content}</main>
        </div>
        <Snackbar
          autoHideDuration={3000}
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          onRequestClose={this._handleSnackbarClose}
        />
        <ConfirmationDialog
          message={this.state.confirmMessage}
          show={this.state.confirmOpen}
          onConfirm={this._handleConfirmYes}
          onClose={this._handleConfirmClose}
        />
      </div>
    );
  }

}  // End MainLayout

MainLayout.propTypes = {
  content: React.PropTypes.object,
};

const styles = {
  container: {
    margin: '0px',
    padding: '0px',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  header: {
    width: '100%',
    flex: '0 0 64px',
  },

  content: {
    minHeight: '300px',
    maxWidth: '768px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20px',
    padding: '5px',
  },
};
