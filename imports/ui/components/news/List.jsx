import React from 'react';
import { MarkdownElement } from '../../helpers/markdown/MarkdownElement';

import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import FlatButton from 'material-ui/FlatButton';
import EditButton from './EditButton';

export default class List extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleNewsEdit = this._handleNewsEdit.bind(this);
    this._showMore = this._showMore.bind(this);
  }  // End constructor

  shouldComponentUpdate(nextProps) {
    if (nextProps.newsLoading) {
      return false;
    }
    return true;
  }

  _showMore() {
    this.props.limit.set(this.props.limit.get() + 3);
  }

  _handleNewsEdit(entry) {
    this.props.edit(entry);
  }

  render() {
    let content = null;
    let showMoreButton = null;

    if (this.props.moreStories) {
      showMoreButton = (
        <FlatButton
          key="0"
          label="Load More"
          labelStyle={styles.ShowMoreLabel}
          primary={true}
          style={styles.showMoreButton}
          onTouchTap={this._showMore}
        />
      );
    }

    const news = this.props.news;
    if (news.length) {
      content = news.map((entry, index) => {
        // Show edit news if project author
        let cardActions = null;
        if (this.props.ownsProject) {
          cardActions = (
            <CardActions
              expandable={true}
              style={styles.editNews}
            >
              <EditButton
                entry={entry}
                handleNewsEdit={this._handleNewsEdit}
              />
            </CardActions>);
        }

        return (
          <Card
            style={styles.newsCard}
            key={entry._id}
            initiallyExpanded={!index}
          >
            <CardHeader
              title={entry.subject}
              subtitle={entry.createdAt.toLocaleDateString()}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText
              expandable={true}
              style={styles.newsMessage}
            >
              <MarkdownElement
                text={entry.message}
              />
            </CardText>
            {cardActions}
          </Card>
        );
      });
    }

    return (
      <div style={styles.listWrapper}>
        {content}
        {showMoreButton}
      </div>
		);
  }

}  // End List

List.propTypes = {
  news: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.object),
    React.PropTypes.object]).isRequired,
  newsLoading: React.PropTypes.bool.isRequired,
  ownsProject: React.PropTypes.bool.isRequired,
  edit: React.PropTypes.func.isRequired,
  moreStories: React.PropTypes.bool.isRequired,
  limit: React.PropTypes.object.isRequired,
};

const styles = {
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '35px',
  },
  newsCard: {
    paddingTop: '7px',
  },
  editNews: {
    padding: '0px',
  },
  newsMessage: {
    paddingTop: '0px',
  },
  showMoreButton: {
    marginTop: '15px',
    marginBottom: '35px',
    alignSelf: 'center',
  },
  ShowMoreLabel: {
    fontFamily: 'spacemanFont',
  },
};
