import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { editProject, GameCats, getById, setCoverUploaded }
  from '../../../api/projects/methods';
import { Loading } from '../../helpers/Loading';
import { PageError } from '../../helpers/PageError';

import React from 'react';
import InputField from '../../helpers/InputField';
import InputMarkdown from '../../helpers/markdown/InputMarkdown';
import InputDropdown from '../../helpers/InputDropdown';
import { CoverArt } from './CoverArt';  // Pure render function
import ChangeCover from './ChangeCover';

import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ActionLabel from 'material-ui/svg-icons/action/label';
import ActionList from 'material-ui/svg-icons/action/list';
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset';
import MapsLocalLibrary from 'material-ui/svg-icons/maps/local-library';
import ActionFindInPage from 'material-ui/svg-icons/action/find-in-page';

export default class Edit extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Autobind
    this._close = this._close.bind(this);
    this._handleCoverUploaded = this._handleCoverUploaded.bind(this);
    this._handleCoverCancelled = this._handleCoverCancelled.bind(this);
    this._handleEditCoverArt = this._handleEditCoverArt.bind(this);
    this._handleSaveGame = this._handleSaveGame.bind(this);

    // Initial State
    this.state = {
      edittingCover: false,
      project: {},
      projectLoading: true,
    };

    // Load existing values
    const projectId = props.projectId;
    getById.call({ projectId },
      (error, result) => {
        if (error) {
          // Error
          this.context.showSnackbar(`Failed to load project.  ${error.message}`);
        } else {
          if (!result) {
            this.context.showSnackbar('Failed to load project.  No project returned.');
          } else {
            this.setState({ project: result }, () =>
              this.setState({ projectLoading: false })
            );
          }
        }
      }
    );
  } // End Constructor

  componentWillMount() {
    if (!this.context.loggingIn && !this.context.currentUser) {
      // Redirect to logon if no current user
      FlowRouter.redirect('/login');
    }
  }

  _close() {
		// Probably should add check for save changes ****
    const pathDef = '/projects/:projectId';
    const params = { projectId: this.props.projectId };
    FlowRouter.go(FlowRouter.path(pathDef, params));
  }

  _handleCoverUploaded() {
    // Display upload Avatar screen
    setCoverUploaded.call({ projectId: this.props.projectId },
      (error) => {
        if (error) {
          // Error message
          this.context.showSnackbar(error.message);
        } else {
          // Pause to allow image to update
          setTimeout(() => {
            this.setState({ edittingCover: false });
          }, 100);
        }
      }
    );
  }

  _handleCoverCancelled() {
		// Close upload cover screen
    this.setState({ edittingCover: false });
  }

  _handleEditCoverArt() {
    // Display upload cover screen
    this.setState({ edittingCover: true });
  }

  _handleSaveGame() {
    const title = this.refs.title.getValue();
    const category = this.refs.category.getValue();
    const description = this.refs.description.getValue();
    const gamePlay = this.refs.gamePlay.getValue();
    const lore = this.refs.lore.getValue();
    const tags = this.refs.tags.getValue();

    const titleOK = this.refs.title.validate();
    const categoryOK = this.refs.category.validate();
    const descriptionOK = this.refs.description.validate();
    const gameplayOK = this.refs.gamePlay.validate();
    const loreOK = this.refs.lore.validate();
    const tagsOK = this.refs.tags.validate();

    if (!titleOK || !categoryOK || !descriptionOK || !gameplayOK || !loreOK || !tagsOK) {
      // Display snackbar
      this.context.showSnackbar('Please fix the errors above.');
    } else {
			// Update project
      editProject.call({
        projectId: this.props.projectId,
        title,
        category,
        description,
        gamePlay,
        lore,
        tags,
      }, (error) => {
        if (error) {
          this.context.showSnackbar(`FAILED to save changes:  ${error.message}`);
        } else {
          // Close edit screen
          this.context.showSnackbar('Changes to project saved.');
          this._close();
        }
      });
    }
  }

  render() {
    const currentUser = this.context.currentUser;
    const project = this.state.project;

    let content = null;
    if (this.context.loggingIn || this.state.projectLoading) {
			// Loading
      content = <Loading />;
    } else if (!currentUser) {
			// Not logged in
      content = <PageError errorMessage="You must be logged in to access this page." />;
    } else if (! this.state.projectLoading && ! project) {
			// Project Not found
      content = <PageError errorMessage="Project not found." />;
    } else if (currentUser._id !== project.authorId) {
			// Not authorized
      content = <PageError errorMessage="You are not authorized to access this page." />;
    } else if (this.state.edittingCover) {
			// Editing Cover
      content = (
        <ChangeCover
          projectId={project._id}
          slingshot="coverUpload"
          onSuccess={this._handleCoverUploaded}
          onCancel={this._handleCoverCancelled}
        />
      );
    } else {
			// Set categories
      let categories = _.map(GameCats, (cat, idx) =>
        <MenuItem value={cat} key={idx} primaryText={cat} />
			);
			// Set wrapper style
      const wrapperStyle = {
        minWidth: Math.min(document.body.clientWidth, 700),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      };
      content = (
        <div style={wrapperStyle}>
          <IconButton
            style={styles.cancelButton}
            tooltip="Cancel"
            tooltipPosition="bottom-center"
            onTouchTap={this._close}
          >
            <NavigationArrowBack color="Black" />
          </IconButton>
          <div>
            <CoverArt
              project={project}
              width={Math.min(document.body.clientWidth, 384) - 64}
              thumb={true}
            />
            <IconButton
              tooltip="Edit Cover Art"
              tooltipPosition="top-center"
              onTouchTap={this._handleEditCoverArt}
            >
              <ImageEdit />
            </IconButton>
          </div>
          <InputField
            ref="title"
            fieldName="Title"
            hintText="Enter game title."
            floatingLabelText="Title"
            required={true}
            minLength={2}
            maxLength={35}
            defaultValue={project.title}
          >
            <ActionLabel color="Grey" />
          </InputField>
          <InputDropdown
            ref="category"
            fieldName="Category"
            floatingLabelText="Category"
            floatingLabelText="Category"
            menuItems={categories}
            required={true}
            defaultValue={project.category}
          >
            <ActionList color="Grey" />
          </InputDropdown>
          <InputMarkdown
            ref="description"
            defaultValue={project.description}
            fieldName="Description"
            floatingLabelText="Description"
            fullWidth={true}
            hintText="Enter game description."
            required={true}
          />

          <InputField
            ref="gamePlay"
            fieldName="Gameplay"
            floatingLabelText="Gameplay"
            fullWidth={true}
            hintText="Enter gameplay."
            multiLine={true}
            required={true}
            defaultValue={project.gamePlay}
          >
            <HardwareVideogameAsset color="Grey" />
          </InputField>

          <InputField
            ref="lore"
            fieldName="Lore"
            floatingLabelText="Lore"
            fullWidth={true}
            hintText="Enter game lore."
            multiLine={true}
            defaultValue={project.lore}
          >
            <MapsLocalLibrary color="Grey" />
          </InputField>

          <InputField
            ref="tags"
            fieldName="Tags"
            floatingLabelText="Tags"
            fullWidth={true}
            hintText="Enter search tags (separated by spaces)."
            defaultValue={project.tags}
          >
            <ActionFindInPage color="Grey" />
          </InputField>
          <RaisedButton
            style={styles.saveButton}
            label="Save Changes"
            primary={true}
            onTouchTap={this._handleSaveGame}
          />
        </div>
      );
    }
    return (
      <div>
				{content}
      </div>
		);
  }

}  // End Edit

Edit.propTypes = {
  projectId: React.PropTypes.string.isRequired,
};

Edit.contextTypes = {
  currentUser: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
  showSnackbar: React.PropTypes.func,
};

const styles = {
  saveButton: {
    margin: '25px 0px 15px 0px',
    alignSelf: 'flex-end',
  },
};
