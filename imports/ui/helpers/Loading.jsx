// This is a pure render function
import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

export const Loading = (props) => {
  const left = props.left;
  const top = props.top;

  return (
    <div>
      <RefreshIndicator size={70} left={left} top={top} status="loading" />
    </div>
	);
};  // End RefreshIndicator

Loading.propTypes = {
  left: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
};

Loading.defaultProps = {
  left: 0,
  top: 0,
};
