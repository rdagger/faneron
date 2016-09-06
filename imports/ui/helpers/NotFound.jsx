import React from 'react';
import SocialMoodBad from 'material-ui/svg-icons/social/mood-bad';

export const NotFound = () =>
  <div style={styles.errorContainer}>
    <SocialMoodBad color="Grey" />
    <h2 style={styles.errorMessage}>Page Not Found</h2>
  </div>;
// End NotFound

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
