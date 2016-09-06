import React from 'react';
import myTheme from '../themes/myTheme.js';

export const SupScript = (props) => {
  const supStyle = { fontWeight: 'lighter', color: myTheme.palette.accent1Color };
  let supscript = null;
  if (props.superscript) {
    supscript = <sup style={supStyle}>&nbsp;{props.superscript}</sup>;
  }
  return (
    <span>
			{props.text}
			{supscript}
    </span>
	);
};  // End SupScript

SupScript.propTypes = {
  text: React.PropTypes.string.isRequired,
  superscript: React.PropTypes.number,
};
