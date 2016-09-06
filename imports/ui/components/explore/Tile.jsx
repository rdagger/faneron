import React from 'react';
import GridTile from 'material-ui/GridList/GridTile';
import { CoverArt } from '../projects/CoverArt';

export default class Tile extends React.Component {
  constructor() {
    super();
    // Autobind
    this._tileClick = this._tileClick.bind(this);
  } // End constructor

  _tileClick() {
    this.props.tileClick(this.props.project._id);
  }

  render() {
    const project = this.props.project;

    return (
      <GridTile
        title={
          <span style={styles.indentStyle}>
            {project.title}
          </span>
        }
        subtitle={
          <span style={styles.indentStyle}>
            by <b>{project.authorName}</b>
          </span>
        }
        style={styles.tile}
        onTouchTap={this._tileClick}
      >
        <CoverArt
          project={project}
          width="384px"
          thumb={true}
        />
      </GridTile>
    );
  }

}  // End Tile

Tile.propTypes = {
  project: React.PropTypes.object.isRequired,
  tileClick: React.PropTypes.func.isRequired,
};

const styles = {
  tile: {
    cursor: 'pointer',
  },

  indentStyle: {
    paddingLeft: '10px',
  },
};
