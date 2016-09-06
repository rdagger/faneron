import React from 'react';
import { star, unstar } from '../../../api/stars/methods';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import myTheme from '../../themes/myTheme';

export default class Star extends React.Component {
  constructor() {
    super();
    // Autobind
    this._starProject = this._starProject.bind(this);
    this._unstarProject = this._unstarProject.bind(this);
  }  // End constructor

  _starProject() {
    star.call({	projectId: this.props.projectId	},
      (error) => {
        if (error) {
          this.context.showSnackbar(`Failed to star project.  ${error.message}`);
        }
      }
    );
  }

  _unstarProject() {
    unstar.call({ projectId: this.props.projectId },
      (error) => {
        if (error) {
          this.context.showSnackbar(`Failed to unstar project.  ${error.message}`);
        }
      }
    );
  }

  render() {
    let handler;
    let tip = '';
    let starColor = 'Black';
    if (! this.props.currentUser) {
			// Not logged in.  Can only view stars
      tip = 'Login to star.';
      starColor = myTheme.palette.disabledColor;
      handler = () => { /* Click does nothing if not logged in. */ };
    } else if (this.props.starredLoading) {
      tip = '';
      handler = () => { /* Click does nothing if still loading. */ };
      starColor = myTheme.palette.disabledColor;
    } else if (this.props.starred) {
      tip = 'Unstar this project';
      starColor = myTheme.palette.primary2Color;
      handler = this._unstarProject;
    } else {
      tip = 'Star this project';
      handler = this._starProject;
    }

    return (
      <Badge
        style={styles.badgeWrapper}
        badgeContent={this.props.stars}
        secondary={true}
      >
        <IconButton
          style={styles.badgeButton}
          tooltip={tip}
          tooltipPosition="top-left"
          onTouchTap={handler}
        >
          <ToggleStar color={starColor} />
        </IconButton >
      </Badge>
		);
  }

}  // End Star

Star.propTypes = {
  projectId: React.PropTypes.string.isRequired,
  stars: React.PropTypes.number.isRequired,
  starredLoading: React.PropTypes.bool.isRequired,
  starred: React.PropTypes.bool.isRequired,
  currentUser: React.PropTypes.object,
};

Star.contextTypes = {
  showSnackbar: React.PropTypes.func.isRequired,
};

const styles = {
  badgeWrapper: {
    padding: '20px 14px 0px 0px',
  },

  badgeButton: {
    width: '24px',
    height: '24px',
    margin: '0px',
    padding: '0px',
  },
};
