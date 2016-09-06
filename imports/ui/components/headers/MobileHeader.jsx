import { Meteor } from 'meteor/meteor';
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { HeaderAvatar } from './HeaderAvatar';
import QuickSearch from '../search/QuickSearch';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class MobileHeader extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleAccountMenu = this._handleAccountMenu.bind(this);
    this._handleCloseLeftNav = this._handleCloseLeftNav.bind(this);
    this._handleCreate = this._handleCreate.bind(this);
    this._handleExplore = this._handleExplore.bind(this);
    this._handleHome = this._handleHome.bind(this);
    this._handleNavChange = this._handleNavChange.bind(this);
    this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);

    // Initial State
    this.state = {
      leftNavOpen: false,
    };
  }  // End constructor

  _handleAccountMenu(event, item) {
    if (item.key === 'logout') {
      // Delay to allow menu to close (Google browser flashes otherwise)
      setTimeout(() => {
        Meteor.logout();
        FlowRouter.go('login');
      }, 50);
    } else if (item.key === 'chat') {
      window.open('https://faneron.rocket.chat/', '_blank');
    } else if (item.props.target) {
      FlowRouter.go(item.props.target);
    }
  }

  _handleCloseLeftNav() {
    this.setState({ leftNavOpen: false });
  }

  _handleCreate() {
    this.setState({ leftNavOpen: false }, () => {
      FlowRouter.go('create');
    });
  }

  _handleExplore() {
    this.setState({ leftNavOpen: false }, () => {
      FlowRouter.go('explore');
    });
  }

  _handleHome() {
    FlowRouter.go('home');
  }

  _handleNavChange(open) {
    this.setState({ leftNavOpen: open });
  }

  _onLeftIconButtonTouchTap() {
    this.setState({ leftNavOpen: !this.state.leftNavOpen });
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <AppBar
          titleStyle={styles.title}
          title="Faneron"
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
          onTitleTouchTap={this._handleHome}
          iconElementRight={<HeaderAvatar menuTap={this._handleAccountMenu} />}
        />

        <Drawer
          open={this.state.leftNavOpen}
          onRequestChange={this._handleNavChange}
          style={styles.leftnav}
          docked={false}
        >
          <MenuItem onTouchTap={this._handleExplore}>Explore</MenuItem>
          <MenuItem onTouchTap={this._handleCreate}>Create</MenuItem>
          <QuickSearch closeLeftNav={this._handleCloseLeftNav} />
        </Drawer>
      </div>
    );
  }

} // End MobileHeader

// Context Types  ****REWORK
MobileHeader.contextTypes = {
  currentUser: React.PropTypes.object,
};

const styles = {
  title: {
    fontFamily: 'spacemanFont',
    cursor: 'pointer',
  },
  wrapper: {
    width: '100%',
  },
};
