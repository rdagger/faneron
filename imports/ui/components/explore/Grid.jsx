import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';

import { Loading } from '../../helpers/Loading.jsx';
import Tiles from './Tiles';

export default class Grid extends React.Component {
  constructor() {
    super();

    // Autobind
    this._handleShowMore = this._handleShowMore.bind(this);
    this._openProject = this._openProject.bind(this);
  } // End constructor

  _handleShowMore() {
    const limit = this.props.limit;
    const projectCount = this.props.projects.length;
    if (projectCount >= limit) {
      this.props.increaseLimit(limit + 6);
    }
  }

  _openProject(projectId) {
    if (projectId) {
      const pathDef = '/projects/:projectId';
      const params = { projectId };
      FlowRouter.go(FlowRouter.path(pathDef, params));
    }
  }

  render() {
    let content = null;
    const projects = this.props.projects;
    if (projects) {
      content = (
        <Tiles
          projects={projects}
          projectsLoading={this.props.projectsLoading}
          openProject={this._openProject}
          moreProjects={projects.length >= this.props.limit}
          showMore={this._handleShowMore}
        />
      );
    }
    // Check if projects loading
    let projectsLoadingIndicator = null;
    if (this.props.projectsLoading) {
      projectsLoadingIndicator = <Loading />;
    }

    return (
      <div>
        {content}
        <div style={styles.indicatorWrapper}>
          <div style={styles.indicator}>
            {projectsLoadingIndicator}
          </div>
        </div>
      </div>
    );
  }

}  // End Grid

Grid.propTypes = {
  projects: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.object),
    React.PropTypes.object]).isRequired,
  projectsLoading: React.PropTypes.bool.isRequired,
  category: React.PropTypes.string,
  limit: React.PropTypes.number,
  increaseLimit: React.PropTypes.func.isRequired,
};

Grid.contextTypes = {
  currentUser: React.PropTypes.object,
  search: React.PropTypes.string,
};

const styles = {
  indicatorWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  indicator: {
    width: '70px',
    position: 'relative',  //Indicator is absolute to position
  },
};
