import React from 'react';
import Tile from './Tile';

import FlatButton from 'material-ui/FlatButton';
import GridList from 'material-ui/GridList';


export default class Tiles extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (nextProps.projectsLoading) {
      return false;
    }
    return true;
  }


  render() {
    const projects = this.props.projects;

    let showMoreButton = null;
    if (this.props.moreProjects) {
      showMoreButton = (
        <FlatButton
          key="0"
          label="Load More"
          primary={true}
          style={styles.showMoreButton}
          labelStyle={styles.ShowMoreLabel}
          onTouchTap={this.props.showMore}
        />
      );
    }

    let content = null;
    if (projects.length) {
      const cols = this.context.mobileState ? 1 : 2;
      const listStyle = this.context.mobileState ? { width: '388px' } : { width: '768px' };

      const tiles = projects.map(project =>
        <Tile
          key={project._id}
          project={project}
          tileClick={this.props.openProject}
        />
      );

      content = (
        <div>
          <GridList
            cellHeight={216}
            cols={cols}
            padding={2}
            style={listStyle}
          >
            {tiles}
          </GridList>
        </div>
      );
    }

    return (
      <div>
        {content}
        <div style={styles.showMoreContainer}>
          {showMoreButton}
        </div>
      </div>
		);
  }

} // End Tiles

Tiles.propTypes = {
  projects: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.object),
    React.PropTypes.object]).isRequired,
  projectsLoading: React.PropTypes.bool.isRequired,
  openProject: React.PropTypes.func.isRequired,
  moreProjects: React.PropTypes.bool.isRequired,
  showMore: React.PropTypes.func.isRequired,
};

Tiles.contextTypes = {
  mobileState: React.PropTypes.bool,
};

const styles = {
  showMoreContainer: {
    textAlign: 'center',
  },

  showMoreButton: {
    marginTop: '15px',
    marginBottom: '35px',
    alignSelf: 'center',
  },

  ShowMoreLabel: {
    fontFamily: 'spacemanFont',
  },
};
