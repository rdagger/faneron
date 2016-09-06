import { Meteor } from 'meteor/meteor';
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { HeaderAvatar } from './HeaderAvatar';
import QuickSearch from '../search/QuickSearch';

import EnhancedButton from 'material-ui/internal/EnhancedButton';
import Paper from 'material-ui/Paper';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';

export default class DesktopHeader extends React.Component {

  _findTab() {
	// return target which is route name prefixed with slash
    const result = `/${FlowRouter.getRouteName()}`;
    return result;
  }

  _goHome() {
    FlowRouter.go(FlowRouter.path('home'));
  }

  _goSearch() {
    FlowRouter.go(FlowRouter.path('search'));
  }

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

  _handleTabsChange(value) {
    FlowRouter.go(value);
  }

  render() {
    return (
      <Paper style={styles.paper} zDepth={1} rounded={false}>
        <EnhancedButton
          onTouchTap={this._goHome}
          disableTouchRipple={true}
        >
          <div style={styles.logoButton}>
            <img style={styles.logoImage} src="/images/logo.png" alt="Logo" />
            <span style={styles.logoText}>Faneron</span>
          </div>
        </EnhancedButton>

        <Tabs
          style={styles.tabs}
          valueLink={{
            value: this._findTab(),
            requestChange: this._handleTabsChange,
          }}
        >
          <Tab style={styles.tab} value="/explore" label="Explore" />
          <Tab style={styles.tab} value="/create" label="Create" />
        </Tabs>

        <QuickSearch />
        <HeaderAvatar
          menuTap={this._handleAccountMenu}
        />
      </Paper>
    );
  }

}  // End DesktopHeader

const styles = {
  paper: {
    background: '#E64A19',
    height: 64,
    position: 'fixed',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoButton: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    marginLeft: '20px',
    marginRight: '20px',
  },
  logoText: {
    color: '#fff',
    fontFamily: 'spacemanFont',
  },

  tabs: {
    minWidth: 300,
  },
  tab: {
    height: 64,
    fontSize: '1.1em',
  },
};
