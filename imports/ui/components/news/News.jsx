import React from 'react';
import { Loading } from '../../helpers/Loading';
import NewsList from './List';
import NewsAdd from './Add';
import NewsEdit from './Edit';

import RaisedButton from 'material-ui/RaisedButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

export default class News extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleAddEditClose = this._handleAddEditClose.bind(this);
    this._handleAddNews = this._handleAddNews.bind(this);
    this._handleEditNews = this._handleEditNews.bind(this);

    // Initial State
    this.state = {
      showAddScreen: false,
      showEditScreen: null,
    };
  }  // End constructor

  _handleAddEditClose() {
    this.setState({ showAddScreen: false });
    this.setState({ showEditScreen: null });
  }

  _handleAddNews() {
    this.setState({ showAddScreen: true });
  }

  _handleEditNews(news) {
    if (news._id) {
      this.setState({ showEditScreen: news });
    } else {
      this.setState({ showEditScreen: null });
    }
  }

  render() {
    const project = this.props.project;
    let addScreen = null;
    let addNewsButton = null;
    let editScreen = null;
    let newsList = null;
    let newsLoadingIndicator = null;

    const ownsProject = !!(this.props.currentUser &&
      this.props.currentUser._id === project.authorId);
    if (this.state.showAddScreen) {
      addScreen = (
        <NewsAdd
          projectId={project._id}
          authorId={project.authorId}
          close={this._handleAddEditClose}
          currentUser={this.props.currentUser}
          loggingIn={this.props.loggingIn}
        />
      );
    } else if (this.state.showEditScreen) {
      editScreen = (
        <NewsEdit
          news={this.state.showEditScreen}
          projectId={project._id}
          authorId={project.authorId}
          close={this._handleAddEditClose}
          currentUser={this.props.currentUser}
          loggingIn={this.props.loggingIn}
        />
      );
    } else {
			// News List
      newsList = (
        <NewsList
          news={this.props.news}
          newsLoading={this.props.newsLoading}
          ownsProject={ownsProject}
          edit={this._handleEditNews}
          moreStories={project.news > this.props.limit.get()}
          limit={this.props.limit}
        />);
			// Show add news button if project author
      if (ownsProject) {
        addNewsButton = (
          <RaisedButton
            style={styles.addButton}
            fullWidth={false}
            label="Add News"
            labelStyle={{ color: 'Black' }}
            labelPosition="before"
            secondary={true}
            onTouchTap={this._handleAddNews}
          >
            <ContentAddCircle color="Black" />
          </RaisedButton>);
      }
      // Check if news loading
      if (this.props.newsLoading) {
        newsLoadingIndicator = <Loading top={-196} />;
      }
    }

    return (
      <div style={styles.newsWrapper}>
        {addNewsButton}
        {addScreen}
        {editScreen}
        {newsList}
        <div style={styles.indicator}>
          {newsLoadingIndicator}
        </div>
      </div>
		);
  }

}  // End News

News.propTypes = {
  news: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  newsLoading: React.PropTypes.bool.isRequired,
  project: React.PropTypes.object.isRequired,
  limit: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
};

const styles = {
  newsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  addButton: {
    marginTop: '10px',
    maxWidth: '180px',
  },

  indicator: {
    width: '70px',
    position: 'relative',  // Indicator is absolute to position
    alignSelf: 'center',
  },
};
