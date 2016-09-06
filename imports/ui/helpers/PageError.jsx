import React from 'react';
import myTheme from '../themes/myTheme.js';
import ActionBuild from 'material-ui/svg-icons/action/build';

export const PageError = (props) =>
  <div style={styles.errorContainer}>
    <ActionBuild color={myTheme.palette.primary2Color} />
    <h2 style={styles.errorMessage}>{props.errorMessage}</h2>
  </div>;
// End PageError

PageError.propTypes = {
  errorMessage: React.PropTypes.string.isRequired,
};

const styles = {
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  errorMessage: {
    marginLeft: '5px',
  },
};
