import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { GameCats } from '../../../api/projects/methods';
import myTheme from '../../themes/myTheme.js';
import GridContainer from './GridContainer';

import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';

export default class Explore extends React.Component {
  constructor() {
    super();

    // Autobind
    this._getCategories = this._getCategories.bind(this);
    this._handleCategoryChange = this._handleCategoryChange.bind(this);
    this._handleSearchClear = this._handleSearchClear.bind(this);
    this._increaseLimit = this._increaseLimit.bind(this);

    // Initial State
    let limit = parseInt(FlowRouter.getQueryParam('limit'), 10);
    if (!limit) {
			// Default limit
      limit = 10;
    }
    let category = FlowRouter.getQueryParam('category');
    if (!category) {
      // Default category
      category = 'All Categories';
    }
    this.state = {
      category,
      limit,
    };
  } // End constructor

  _getCategories() {
    const currentUser = this.context.currentUser;
    const categories = _.map(GameCats,
      (cat, idx) => <MenuItem value={cat} key={idx + 4} primaryText={cat} />
    );
    categories.unshift(<Divider key={3} />);

    if (currentUser && ! this.context.loggingIn) {
      // Watching
      if (currentUser.profile.watch) {
        categories.unshift(<MenuItem value="Watching" key={2} primaryText="Watching" />);
      }
      // My Projects
      categories.unshift(<MenuItem value="My Projects" key={1} primaryText="My Projects" />);
    }
    categories.unshift(<MenuItem value="All Categories" key={0} primaryText="All Categories" />);

    return categories;
  }

  _handleCategoryChange(event, index, value) {
    // Reset limit before changing category
    this.setState({ limit: 6, category: value },
      () => {
        FlowRouter.setQueryParams({ category: value, limit: null });
      }
    );
  }

  _handleSearchClear() {
    // Clear search, reset limit
    this.context.setSearch(null,
      () => {
        this.setState({ limit: 6 },
           () => {
             FlowRouter.setQueryParams({ limit: null });
           }
         );
      }
     );
  }

  _increaseLimit(limit) {
    this.setState({ limit },
      () => {
        FlowRouter.setQueryParams({ limit });
      }
    );
  }


  render() {
    let searchGroup = null;
    const search = this.context.search;
    if (search) {
      searchGroup = (
        <ToolbarGroup float="right" lastChild={true}>
          <ToolbarSeparator />
          <ToolbarTitle text={search} style={styles.searchLabel} />
          <IconButton
            tooltip="Clear Search"
            tooltipPosition="bottom-center"
            onTouchTap={this._handleSearchClear}
          >
            <NavigationCancel color={myTheme.palette.primary2Color} style={styles.searchIcon} />
          </IconButton>
        </ToolbarGroup>
      );
    }

    return (
      <div>
        <Toolbar
          style={{ backgroundColor: 'White' }}
        >
          <ToolbarGroup>
            <SelectField
              labelStyle={{ color: myTheme.palette.primary1Color }}
              iconStyle={{ fill: myTheme.palette.primary2Color }}
              maxHeight={320}
              value={this.state.category}
              onChange={this._handleCategoryChange}
            >
              {this._getCategories()}
            </SelectField>
          </ToolbarGroup>
          {searchGroup}
        </Toolbar>
        <GridContainer
          category={this.state.category}
          limit={this.state.limit}
          increaseLimit={this._increaseLimit}
          search={this.context.search}
          currentUser={this.context.currentUser}
        />
      </div>
		);
  }

}  // End Explore

Explore.contextTypes = {
  currentUser: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
  search: React.PropTypes.string,
  setSearch: React.PropTypes.func,
};

const styles = {
  searchIcon: {
    verticalAlign: 'text-bottom',
  },
  searchLabel: {
    marginLeft: '20px',
    paddingRight: '0px',
    fontFamily: 'Roboto,sans-serif',
    fontSize: '.8em',
    textTransform: 'upper',
    color: 'LightGray',
  },
};
