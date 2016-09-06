import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import myTheme from '../../themes/myTheme.js';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import ActionSearch from 'material-ui/svg-icons/action/search';


export default class QuickSearch extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
    this._searchClick = this._searchClick.bind(this);
  }  // End constructor

  _handleKeyDown(e) {
    // Enter key fires search
    if (e.keyCode === 13) {
      this._handleSearch();
    }
  }

  _handleSearch() {
    const searchValue = this.refs.searchField.getValue();

    if (searchValue) {
      // Clear search box (There is probably a better way to do this.)
      this.refs.searchField.getInputNode().value = null;

      // Close left nav if open
      if (this.props.closeLeftNav) {
        this.props.closeLeftNav();
      }

      const currentRoute = FlowRouter.current().route.name;
      if (currentRoute === 'explore') {
        // Already on explore page, set search then clear limit and category, then reload
        this.context.setSearch(searchValue,
          () => {
            FlowRouter.setQueryParams({ category: null, limit: null });
            FlowRouter.reload();
          }
        );
      } else {
        // Set the search context and afterwards route to explore
        this.context.setSearch(searchValue,
          () => {
            const pathDef = '/explore';
            FlowRouter.go(FlowRouter.path(pathDef));
          }
        );
      }
    }
  }

  _searchClick() {
    if (this.refs.searchField.getValue()) {
      // Run search if there is value
      this._handleSearch();
    } else {
      // Set focus if no current value
      this.refs.searchField.focus();
    }
  }

  render() {
    const searchWrapperStyle = { backgroundColor: myTheme.palette.primary2Color,	display: 'flex' };
    return (
      <div style={searchWrapperStyle}>
        <IconButton
          onTouchTap={this._searchClick}
        >
          <ActionSearch color="White" />
        </IconButton>
        <div>
          <TextField
            ref="searchField"
            hintText="Search"
            type="text"
            fullWidth={true}
            inputStyle={{ color: 'LightYellow' }}
            underlineStyle={{ borderColor: 'Transparent' }}
            underlineFocusStyle={{ borderColor: 'Yellow' }}
            onKeyDown={this._handleKeyDown}
          />
        </div>
      </div>
    );
  }

} // End QuickSearch

QuickSearch.propTypes = {
  closeLeftNav: React.PropTypes.func,
};

QuickSearch.contextTypes = {
  search: React.PropTypes.string,
  setSearch: React.PropTypes.func,
};
