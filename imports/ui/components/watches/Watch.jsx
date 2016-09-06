import React from 'react';
import { watch, unwatch } from '../../../api/watches/methods';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import IconButton from 'material-ui/IconButton';
import myTheme from '../../themes/myTheme';

export default class Watch extends React.Component {
  constructor() {
    super();
    // Autobind
    this._watchProject = this._watchProject.bind(this);
    this._unwatchProject = this._unwatchProject.bind(this);
  }  // End constructor

  _watchProject() {
    watch.call({	projectId: this.props.projectId	},
      (error) => {
        if (error) {
          this.context.showSnackbar(`Failed to watch project.  ${error.message}`);
        }
      }
    );
  }

  _unwatchProject() {
    unwatch.call({ projectId: this.props.projectId },
      (error) => {
        if (error) {
          this.context.showSnackbar(`Failed to unwatch project.  ${error.message}`);
        }
      }
    );
  }

  render() {
    let handler;
    let tip = '';
    let watchColor = 'Black';
    if (! this.props.currentUser) {
      // Not logged in.  Can only view stars
      tip = 'Login to watch.';
      watchColor = myTheme.palette.disabledColor;
      handler = () => { /* Click does nothing if not logged in. */ };
    } else if (this.props.watchedLoading) {
      tip = '';
      watchColor = myTheme.palette.disabledColor;
      handler = () => { /* Click does nothing if still loading. */ };
    } else if (this.props.watched) {
      tip = 'Stop watching project';
      watchColor = myTheme.palette.primary2Color;
      handler = this._unwatchProject;
    } else {
      tip = 'Watch project';
      handler = this._watchProject;
    }

    return (
      <div style={styles.watchWrapper}>
        <IconButton
          style={styles.watchButton}
          tooltip={tip}
          tooltipPosition="top-left"
          onTouchTap={handler}
        >
          <ActionVisibility color={watchColor} />
        </IconButton >
      </div>
		);
  }

}  // End Watch

Watch.propTypes = {
  projectId: React.PropTypes.string.isRequired,
  watchedLoading: React.PropTypes.bool.isRequired,
  watched: React.PropTypes.bool.isRequired,
  currentUser: React.PropTypes.object,
};

Watch.contextTypes = {
  showSnackbar: React.PropTypes.func.isRequired,
};

const styles = {
  watchWrapper: {
    padding: '22px 14px 0px 0px',
  },

  watchButton: {
    width: '24px',
    height: '24px',
    margin: '0px',
    padding: '0px',
  },
};
