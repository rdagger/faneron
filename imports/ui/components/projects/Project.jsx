import React from 'react';
import { Loading } from '../../helpers/Loading';
import { PageError } from '../../helpers/PageError';
import { SupScript } from '../../helpers/SupScript';
import ProjectHeader from './Header';
import { Overview } from './Overview';
import NewsContainer from '../news/NewsContainer';
import CommentsContainer from '../comments/CommentsContainer';

import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';

export default class Project extends React.Component {

  constructor() {
    super();
    // Initial State
    this.state = {
      tabsValue: 'overview',
    };
  }  // End constructor

  render() {
    let content = null;
    const project = this.props.project;
    if (this.props.projectLoading) {
      content = <Loading />;
    } else if (project) {
      content = (
        <div>
          <ProjectHeader
            project={project}
            starredLoading={this.props.starredLoading}
            starred={this.props.starred}
            watchedLoading={this.props.watchedLoading}
            watched={this.props.watched}
            currentUser={this.props.currentUser}
          />
          <Tabs tabItemContainerStyle={styles.tabItems}>
            <Tab value="overview" label="Overview">
              <Overview project={project} />
            </Tab>
            <Tab
              value="news"
              label={<SupScript text="News" superscript={project.news} />}
            >
              <NewsContainer project={project} />
            </Tab>
            <Tab
              value="comments"
              label={<SupScript text="Comments" superscript={project.comments} />}
            >
              <CommentsContainer project={project} />
            </Tab>
          </Tabs>
        </div>
      );
    } else {
      // Project Not found
      content = <PageError errorMessage="Project page not found." />;
    }

    return <div>{content}</div>;
  }

} // End Projects

Project.propTypes = {
  project: React.PropTypes.object.isRequired,
  projectLoading: React.PropTypes.bool.isRequired,
  starred: React.PropTypes.bool.isRequired,
  starredLoading: React.PropTypes.bool.isRequired,
  watched: React.PropTypes.bool.isRequired,
  watchedLoading: React.PropTypes.bool.isRequired,
  currentUser: React.PropTypes.object,
};

const styles = {
  tabItems: {
    fontFamily: 'Roboto,sans-serif',
  },
};
