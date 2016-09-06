import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { CoverArt } from './CoverArt';
import Star from '../stars/Star';
import Watch from '../watches/Watch';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';

export default class Header extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleEdit = this._handleEdit.bind(this);
  }  // End constructor

  _handleEdit() {
    const pathDef = '/edit/:projectId';
    const params = { projectId: this.props.project._id };
    FlowRouter.go(FlowRouter.path(pathDef, params));
  }

  render() {
    const project = this.props.project;
    let edit = null;
    if (this.props.currentUser && this.props.currentUser._id === project.authorId) {
      edit = 	(
        <FloatingActionButton
          iconStyle={{ fill: 'Black' }}
          mini={true}
          secondary={true}
          style={styles.editButton}
          title="Edit Game"
          onTouchTap={this._handleEdit}
        >
          <ImageEdit />
        </FloatingActionButton>);
    }

    return (
      <div>
        <div style={styles.subHeader}>
          <div>
            <h1 style={styles.projectTitle}>{project.title}</h1>
            <p style={styles.projectAuthor}>by {project.authorName}</p>
          </div>
          <div style={styles.iconWrapper}>
            <Watch
              projectId={project._id}
              watchedLoading={this.props.watchedLoading}
              watched={this.props.watched}
              currentUser={this.props.currentUser}
            />
            <Star
              projectId={project._id}
              stars={project.stars}
              starredLoading={this.props.starredLoading}
              starred={this.props.starred}
              currentUser={this.props.currentUser}
            />
          </div>
        </div>
        <div style={styles.imageWrapper}>
          <CoverArt project={project} />
          {edit}
        </div>
      </div>
		);
  }

}  // End Header

Header.propTypes = {
  project: React.PropTypes.object.isRequired,
  starredLoading: React.PropTypes.bool.isRequired,
  starred: React.PropTypes.bool.isRequired,
  watchedLoading: React.PropTypes.bool.isRequired,
  watched: React.PropTypes.bool.isRequired,
  currentUser: React.PropTypes.object,
};

const styles = {
  editButton: {
    position: 'absolute',
    right: '15px',
    bottom: '-5px',
  },

  iconWrapper: {
    display: 'flex',
  },

  imageWrapper: {
    position: 'relative',
  },

  subHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: 0.5,
    marginTop: '10px',
  },

  projectTitle: {
    margin: '0px',
    lineHeight: 0.9,
    fontFamily: 'Roboto,sans-serif',
  },

  projectAuthor: {
    marginTop: '12px',
    marginLeft: '5px',
    fontFamily: 'Roboto,sans-serif',
  },
};
