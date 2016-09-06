// This is a pure render function
import { Meteor } from 'meteor/meteor';
import React from 'react';

export const CoverArt = (props) => {
  const project = props.project;
  const imageStyle = { width: props.width, maxWidth: '768px' };
  let source = null;
  const imageSize = props.thumb ? 'thumb' : 'cover';
  if (project.coverUploaded.getTime()) {
    source = `${Meteor.settings.public.s3}/projects/${project._id}/${
      imageSize}.jpg?ul=${project.coverUploaded.getTime().toString()}`;
  } else {
    // No cover art uploaded yet
    source = `${Meteor.settings.public.s3}/images/none-${imageSize}.png`;
  }

  return (
    <img src={source} style={imageStyle} alt="CoverArt" />
  );
};  // End CoverArt

CoverArt.propTypes = {
  project: React.PropTypes.object.isRequired,
  width: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  thumb: React.PropTypes.bool.isRequired,
};

CoverArt.defaultProps = {
  width: '100%',
  thumb: false,
};
