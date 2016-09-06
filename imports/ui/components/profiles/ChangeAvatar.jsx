/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
import { $ } from 'meteor/jquery';
import { Slingshot } from 'meteor/edgee:slingshot';
import 'meteor/mrt:jquery-jcrop';
import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline';
import { Tracker } from 'meteor/tracker';

export default class ChangeAvatar extends React.Component {
  constructor() {
    super();
    // Autobind
    this._cancel = this._cancel.bind(this);
    this._getInitialSelectionSize = this._getInitialSelectionSize.bind(this);
    this._handleFileChange = this._handleFileChange.bind(this);
    this._handleFileUpload = this._handleFileUpload.bind(this);
    this._resetInput = this._resetInput.bind(this);
    this._setUploadDisplay = this._setUploadDisplay.bind(this);
    this._updatePreview = this._updatePreview.bind(this);

    // Initial State
    this.state = {
      jcropAPI: null,
      statusLabel: '',
      uploader: null,
      selectDisabled: false,
      uploadDisabled: true,
      uploadVisibility: 'hidden',
      progressVisibility: 'hidden',
      selectButtonText: 'Select Photo',
      errorMessage: 'error',
      progress: 0,
    };
  }  // End constructor

  componentDidMount() {
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value(callback, type, quality) {
          const binStr = atob(this.toDataURL(type, quality).split(',')[1]);
          const len = binStr.length;
          const arr = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback(new Blob([arr], { type: type || 'image/png' }));
        },
      });
    }
  }

  _cancel() {
    this.props.onCancel();
  }

  _getInitialSelectionSize(width, height, options) {
    const percent = this.props.initialSelectionPercent;
    const minWidth = options.minSize[0];
    const minHeight = options.minSize[1];

    const	wScale = width * percent / minWidth;
    const hScale = height * percent / minHeight;
    const scale = Math.min(hScale, wScale);
    options.setSelect[2] = minWidth * scale;
    options.setSelect[3] = minHeight * scale;
  }

  _handleFileChange(handleFileChangeEvent) {
    this.setState({ selectButtonText: 'LOADING...' });
    this.setState({ selectDisabled: true });
    // Check for valid file type
    if (!handleFileChangeEvent.target.files[0].type.toLowerCase().startsWith('image')) {
      // Store error message
      this.setState({
        errorMessage: `${handleFileChangeEvent.target.files[0].name} is not a valid image`,
      }, () => {
        this._resetInput();
      });
      return;
    }
    // Check for maximum input file size
    if ((handleFileChangeEvent.target.files[0].size / 1024 / 1024) > this.props.maxInputSize) {
      // Store error message
      this.setState({ errorMessage: `The maximum input file size is${
        this.props.maxInputSize.toString()}MB.` },
        () => {
          this._resetInput();
        }
      );
      return;
    }
    const file = handleFileChangeEvent.target.files[0];
    // Read input file
    const reader = new FileReader();
    reader.onload = (readerOnloadEvent) => {
      const img = this.refs.Photo;
      img.src = readerOnloadEvent.target.result;
      img.onload = () => {
        // Show upload options
        this._setUploadDisplay();
        // Confirm image is not too small
        const options = this.props.jcropOptions;
        if (img.width < options.minSize[0] || img.height < options.minSize[1]) {
          this.setState({ errorMessage: `Image is too small. Minimum size is${
            options.minSize[0].toString()}px, ${options.minSize[1].toString()}px.` },
            () => {
              this._resetInput();
            }
          );
          return;
        }
        // Attach Jcrop to image
        if (this.state.jcropAPI) {
          this.state.jcropAPI.setImage(img.src);
        }
        // Adjust initial select size based on percentage specified
        this._getInitialSelectionSize(img.width, img.height, options);
        // Hook Jcrop selection events
        options.onChange = this._updatePreview;
        options.onSelect = this._updatePreview;
        // Can't use arrow function with Jcrop
        const self = this;
        $(img).Jcrop(options, function() {
          // store the jcrop API for reuse
          self.setState({ jcropAPI: this });
        });
      };
    };
    reader.onerror = (readerOnErrorEvent) => {
      // Store error message
      this.setState({
        errorMessage: `Failed to load file.  ${readerOnErrorEvent.target.error.message}`,
      }, () => {
        this._resetInput();
      });
    };
    reader.readAsDataURL(file);
  }

  _handleFileUpload() {
    this.setState({ selectDisabled: true });
    this.setState({ uploadDisabled: true });
    this.setState({ uploader: null });
    this.setState({ statusLabel: '' });
    const upload = new Slingshot.Upload(this.props.slingshot);
    const canvas = this.refs.Preview;
    canvas.toBlob((blob) => {
      this.setState({ progressVisibility: 'visible' });
      this.setState({ statusLabel: 'Uploading photo...' });
      this.setState({ uploader: upload });
      upload.send(blob, (error, downloadURL) => {
        // Stop progress tracking
        progressTracker.stop();

        if (error) {
          // Upload error
          this.setState({ statusLabel: `Upload Status: ${upload.status()}` });
          this.setState({ errorMessage: error.reason }, () => {
            this._resetInput();
          });
        } else {
          // Successful upload
          this.setState({ statusLabel: 'Photo uploaded successfully.' });
          this.props.onSuccess(downloadURL);
          // Disable crop
          if (this.state.jcropAPI) {
            this.state.jcropAPI.disable();
          }
        }
      });

      // Track progress of upload
      const progressTracker = Tracker.autorun(() => {
        const progress = Math.round(upload.progress() * 100) || 0;
        this.setState({ progress });
      });
    }, this.props.imageType, this.props.imageQuality);
  }

  _resetInput() {
    // Release and disable cropping
    if (this.state.jcropAPI) {
      this.state.jcropAPI.release();
      this.state.jcropAPI.disable();
    }
    // Show reason for reset
    this.context.showSnackbar(this.state.errorMessage);
    // Clear file input
    this.refs.uploadForm.reset();
    // Clear underlying image source
    if (this.refs.Photo.hasAttribute('src')) {
      this.refs.Photo.removeAttribute('src');
    }
    // Set button and progress states
    this.setState({ selectDisabled: false });
    this.setState({ selectButtonText: 'Select Photo' });
    this.setState({ uploadDisabled: true });
    this.setState({ uploadVisibility: 'hidden' });
    this.setState({ progressVisibility: 'hidden' });
    // Clear uploader
    this.setState({ uploader: null });
  }

  _setUploadDisplay() {
    this.setState({ selectDisabled: false });
    this.setState({ selectButtonText: 'Select Photo' });
    this.setState({ uploadDisabled: false });
    this.setState({ uploadVisibility: 'visible' });
    this.setState({ uploader: null });
    this.setState({ statusLabel: '' });
  }

  _updatePreview(ev) {
    if (parseInt(ev.w, 10) > 0) {
      const img = this.refs.Photo;
      // Insure selection does not exceed source dimensions
      const sourceWidth = ev.w > img.width ? img.width : ev.w;
      const sourceHeight = ev.h > img.height ? img.height : ev.h;
      const canvas = this.refs.Preview;
      canvas.width = this.props.width;
      canvas.height = this.props.height;
      const context = canvas.getContext('2d');
      context.drawImage(img, ev.x, ev.y, sourceWidth, sourceHeight,
        0, 0, canvas.width, canvas.height);
    }
  }

  render() {
    const previewStyle = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
      overflow: 'hidden',
    };

    const uploadStyle = {
      minWidth: 330,
      minHeight: 350,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: '10px',
    };

    return (
      <div>
        <Paper ref="uploadControl" style={uploadStyle}>
          <div>
            <form
              encType="multipart/form-data"
              ref="uploadForm"
              method="post" action=""
              onSubmit={ev => ev.preventDefault()}
            >
              <input
                type="file"
                ref="File"
                onChange={this._handleFileChange}
                accept="image/png,image/jpeg,image/gif"
                style={styles.fileInput}
              />
            </form>
          </div>
          <div style={styles.buttonContainer}>
            <IconButton
              style={styles.cancelButton}
              tooltip="Cancel"
              tooltipPosition="top-left"
              onTouchTap={this._cancel}
            >
              <NavigationArrowBack color="Black" />
            </IconButton>
            <IconButton
              touch={true}
              tooltipStyles={{ zIndex: 99 }}
              tooltip={`Optimal resolution is ${this.props.width}x${this.props.height}`}
              tooltipPosition="bottom-center"
            >
              <ActionHelpOutline color="Black" />
            </IconButton>
            {/* Probably should not access File ref in render block per React docs,
                but it seems to work OK*/}
            <RaisedButton
              label={this.state.selectButtonText}
              disabled={this.state.selectDisabled}
              onTouchTap={() => { this.refs.File.click(); }}
            />
            <RaisedButton
              ref="uploadButton"
              style={{ visibility: this.state.uploadVisibility }}
              disabled={this.state.uploadDisabled}
              label="Upload"
              primary={true}
              onTouchTap={this._handleFileUpload}
            />
          </div>
          <div>
            <img
              alt="Crop Area"
              ref="Photo"
              style={{ visibility: 'hidden' }}
            />
            <p style={{ visibility: this.state.uploadVisibility, textAlign: 'center' }}>
              Select area to crop and zoom.
            </p>
          </div>
          <div style={styles.previewContainer}>
            <canvas ref="Preview" style={previewStyle}></canvas>
            <div style={{ visibility: this.state.progressVisibility }}>
              <div style={styles.progressIndicators}>
                <CircularProgress
                  style={styles.circularProgress}
                  mode="determinate"
                  value={this.state.progress}
                />
                <p>{this.state.progress}%</p>
              </div>
            </div>
          </div>
          <div>
            <p style={styles.statusLabel}><strong>{this.state.statusLabel}</strong></p>
          </div>
        </Paper>
      </div>
    );
  }

}  // End ChangeAvatar

ChangeAvatar.propTypes = {
  slingshot: React.PropTypes.string.isRequired, // slingshot Directive *required
  width: React.PropTypes.string, // upload width
  height: React.PropTypes.string, // upload height
  imageType: React.PropTypes.string, // image MIME type, compatible with canvas.toBlob()
  imageQuality: React.PropTypes.number, // image quality for JPG or WEBP, number 0.0 to 1.0
  initialSelectionPercent: React.PropTypes.number,
  maxInputSize: React.PropTypes.number, // the max file size the file input control will allow
  jcropOptions: React.PropTypes.object, // Jcrop options
  onSuccess: React.PropTypes.func.isRequired, // on upload success callback(downloadURL)
  onCancel: React.PropTypes.func.isRequired,  // on upload cancel callback
};

ChangeAvatar.contextTypes = {
  showSnackbar: React.PropTypes.func,
};

ChangeAvatar.defaultProps = {
  width: '128',  // Ratio should match aspect ratio
  height: '128',
  imageType: 'image/jpeg',
  imageQuality: 0.85,
  initialSelectionPercent: 0.8,  // Sets initial selection
  jcropOptions: {
    // Should match aspect ratio. Min selection size and also determines min image size.
    minSize: [100, 100],
    aspectRatio: 1,  // Greater than 1 is landscape, Less than 1 is portrait
    bgFade: true,
    bgOpacity: 0.5,
    boxWidth: 256,
    boxHeight: 0,
    // Overrided by Initial Selection Percent because it looks bad on larger images
    setSelect: [0, 0, 100, 100],
  },
  maxInputSize: 2, // Maximum size of input file (not Slingshot maxSize),
};

const styles = {
  buttonContainer: {
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cancelButton: {
    width: '24px',
    height: '24px',
    padding: '0px 0px 0px 0px',
  },
  fileInput: {
    display: 'none',
  },
  previewContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  progressIndicators: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  circularProgress: {
    margin: '10px 10px 0px 0px',
  },
  statusLabel: {
    textAlign: 'center',
  },
};
