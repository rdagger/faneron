// This is a pure render function
import React from 'react';
import { MarkdownElement } from '../../helpers/markdown/MarkdownElement';
import myTheme from '../../themes/myTheme.js';
import { Share } from './Share';

export const Overview = (props) => {
  const project = props.project;
  const headingStyle = {
    color: myTheme.palette.primary1Color,
    fontFamily: 'spacemanFont',
    marginTop: '0px',
    display: 'inline',
  };

  let description = null;
  if (project.description) {
    description = (
      <div>
        <h4 style={headingStyle}>description</h4>
        <div style={styles.overviewText}>
          <MarkdownElement
            text={project.description}
          />
        </div>
      </div>
    );
  }

  let gamePlay = null;
  if (project.gamePlay) {
    gamePlay = (
      <div>
        <h4 style={headingStyle}>gameplay</h4>
        <div style={styles.overviewText}>
          <MarkdownElement
            text={project.gamePlay}
          />
        </div>
      </div>
    );
  }

  let lore = null;
  if (project.lore) {
    lore = (
      <div>
        <h4 style={headingStyle}>lore</h4>
        <div style={styles.overviewText}>
          <MarkdownElement
            text={project.lore}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={styles.headWrapper}>
        <span>
          <h4 style={headingStyle}>cat:&nbsp;</h4>
          <span style={styles.overviewText}>{project.category}</span>
        </span>
        <span>
          <Share title={project.title} />
        </span>
      </div>
      {description}
      {gamePlay}
      {lore}
      <div>
        <h4 style={headingStyle}>launched:&nbsp;</h4>
        <span style={styles.overviewText}>{project.createdAt.toLocaleDateString()}</span>
      </div>
    </div>
	);
};  // End Overview

Overview.propTypes = {
  project: React.PropTypes.object.isRequired,
};

const styles = {
  headWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  overviewText: {
    fontFamily: 'Roboto,sans-serif',
    marginBottom: '20px',
  },
};
