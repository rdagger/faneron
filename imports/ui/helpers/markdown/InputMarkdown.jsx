/* eslint-disable no-confusing-arrow */
/* eslint-disable no-param-reassign */
import React from 'react';
import { _ } from 'meteor/underscore';
import { MarkdownElement } from './MarkdownElement';
import { MarkdownTools } from './MarkdownTools';
import myTheme from '../../themes/myTheme.js';
import TextField from 'material-ui/TextField';

export default class InputMarkdown extends React.Component {
  constructor(props) {
    super(props);
    // Autobind
    this._handleChange = this._handleChange.bind(this);
    this._handlePreviewToggle = this._handlePreviewToggle.bind(this);
    this._addMarkdown = this._addMarkdown.bind(this);
    this._handleBold = this._handleBold.bind(this);
    this._handleInsertLink = this._handleInsertLink.bind(this);
    this._handleInsertPhoto = this._handleInsertPhoto.bind(this);
    this._handleItalics = this._handleItalics.bind(this);
    this._handleQuote = this._handleQuote.bind(this);
    this._handleStrikethrough = this._handleStrikethrough.bind(this);
    this.getValue = this.getValue.bind(this);
    this.setErrorText = this.setErrorText.bind(this);
    this.validate = this.validate.bind(this);

    // Initial State
    this.state = {
      error: '',
      preview: false,
      text: props.defaultValue || '',
    };
  }  // End constructor

  getValue() {
    return this.refs.textEditor && this.refs.textEditor.getValue();
  }

  setErrorText(error) {
    this.setState({ error });
  }

  validate() {
    if (this.refs.textEditor) {
      const fieldValue = this.refs.textEditor.getValue();
      const errorPrevious = this.state.error;
      let errorCurrent = '';

      // Check if required
      if (this.props.required && !fieldValue) {
        errorCurrent = `${this.props.fieldName} required.`;
      } else if (this.props.minLength && fieldValue.length < this.props.minLength) {
        // Check if minimum length
        errorCurrent = `${this.props.fieldName} must be at least ${
          this.props.minLength.toString()} characters.`;
      } else if (this.props.maxLength && fieldValue.length > this.props.maxLength) {
        // Check if maximum length
        errorCurrent = `${this.props.fieldName} must be less than ${
          this.props.maxLength.toString()} characters.`;
      }

      // Only change state if something actually changed
      if (errorCurrent !== errorPrevious) {
        this.setState({	error: errorCurrent });
      }

      return !errorCurrent;
    }
    return undefined;
  }

  _handleBold() {
    const textArea = this.refs.textEditor.getInputNode();
    const mark = '**';
    this._addMarkdown(textArea, mark);
  }

  _handleItalics() {
    const textArea = this.refs.textEditor.getInputNode();
    const mark = '*';
    this._addMarkdown(textArea, mark);
  }

  _handleInsertLink() {
    const textArea = this.refs.textEditor.getInputNode();

    // Get selection positions
    let selStart = textArea.selectionStart;
    let selEnd = textArea.selectionEnd;

    let text = textArea.value;

    // Break text into start / selection / end
    const start = text.slice(0, selStart);
    let selection = text.slice(selStart, selEnd);
    const end = text.slice(selEnd);

    if (!selection) {
      // No selection
      selection = '[](http://)';
    }	else {
      selection = `[${selection}](http://)`;
    }

    // Update text
    text = start + selection + end;
    textArea.value = text;
    this.setState({ text });

    // Set cursor
    if (selection === '[](http://)') {
      // Place cursor in label area if no label specified
      selStart++;
    } else {
      // Select url text
      selStart += selection.length - 1;
    }
    selEnd = selStart;
    textArea.selectionStart = selStart;
    textArea.selectionEnd = selEnd;
    textArea.focus();
  }

  _handleInsertPhoto() {
    const textArea = this.refs.textEditor.getInputNode();

    // Get selection positions
    let selStart = textArea.selectionStart;
    let selEnd = textArea.selectionEnd;
    let text = textArea.value;

    // Break text into start / selection / end
    const start = text.slice(0, selStart);
    let selection = text.slice(selStart, selEnd);
    const end = text.slice(selEnd);

    if (!selection) {
      // No selection
      selection = '![alt-text](http://)';
    }	else {
      selection = `![${selection}](http://)`;
    }

    // Update text
    text = start + selection + end;
    textArea.value = text;
    this.setState({ text });

    // Set cursor
    selStart += selection.length - 1;
    selEnd = selStart;
    textArea.selectionStart = selStart;
    textArea.selectionEnd = selEnd;
    textArea.focus();
  }

  _handleQuote() {
    const textArea = this.refs.textEditor.getInputNode();

    // Get selection positions
    let selStart = textArea.selectionStart;
    let selEnd = textArea.selectionEnd;

    let text = textArea.value;

    // Break text into start / selection / end
    const start = text.slice(0, selStart);
    let selection = text.slice(selStart, selEnd);
    const end = text.slice(selEnd);

    if (!selection) {
      // No selection
      selection = '>';
      // Confirm new line before quote
      if (!start.endsWith('\n')) {
        selStart++;
        selEnd = selStart;
        selection = `\n${selection}`;
      }
    }	else {
      const lines = selection.split('\n');
      const alreadyQuoted = _.every(lines, (line) => line.startsWith('>'));
      if (alreadyQuoted) {
        // Remove block quotes
        selection = _.map(lines, (line) =>
          line.slice(1)
        ).join('\n');
        selEnd -= lines.length;
      } else {
        // Add block quotes
        selection = _.map(lines, (line) =>
           line.startsWith('>') ? line : `>${line}`
        ).join('\n');
        selEnd += lines.length;
        // Confirm new line before quote
        if (!start.endsWith('\n')) {
          selStart++;
          selEnd++;
          selection = `\n${selection}`;
        }
        // Confirm new line after quote.
        if (!end.startsWith('\n\n') && !selection.endsWith('\n')) {
          if (end.startsWith('\n')) {
            selection += '\n';
          } else {
            selection += '\n\n';
          }
        }
      }
    }

    // Update text
    text = start + selection + end;
    textArea.value = text;
    this.setState({ text });

    // Move cursor position between marks
    textArea.selectionStart = selStart;
    textArea.selectionEnd = selEnd;
    textArea.focus();
  }

  _handleStrikethrough() {
    const textArea = this.refs.textEditor.getInputNode();
    const mark = '~~';
    this._addMarkdown(textArea, mark);
  }

  _addMarkdown(textArea, mark) {
    if (textArea) {
      // Get selection positions
      let selStart = textArea.selectionStart;
      let selEnd = textArea.selectionEnd;

      let text = textArea.value;

      // Break text into start / selection / end
      const start = text.slice(0, selStart);
      const selection = text.slice(selStart, selEnd);
      const end = text.slice(selEnd);

      // Check if markdown already present
      if (start.endsWith(mark) && end.startsWith(mark)) {
        // Remove markdown if before and after selection
        text = start.slice(0, start.length - mark.length) + selection + end.slice(mark.length);
        selStart -= mark.length;
        selEnd = selStart + selection.length;
      } else if (selection.endsWith(mark) && selection.startsWith(mark)) {
        // Remove markdown if selection already contains markdown
        text = start + selection.slice(mark.length, selection.length - mark.length) + end;
        selEnd = selStart + selection.length - (mark.length * 2);
      } else {
				// Add markdown
        text = start + mark + selection + mark + end;
        selStart += mark.length;
        selEnd = selStart + selection.length;
      }

      // Update text
      textArea.value = text;
      this.setState({ text });

			// Move cursor position between marks
      textArea.selectionStart = selStart;
      textArea.selectionEnd = selEnd;
      textArea.focus();
    }
  }

  _handleChange(ev) {
    if (ev.target) {
      this.setState({ text: ev.target.value });
      if (this.state.error) {
        this.validate();
      }
    }
  }

  _handlePreviewToggle() {
    this.setState({ preview: !this.state.preview });
  }

  render() {
    let editorStyle = {};
    let previewStyle = {};
    if (this.state.preview) {
      editorStyle = {	position: 'absolute', top: '-9999px', left: '-9999px' };
    } else {
      previewStyle = {	position: 'absolute', top: '-9999px', left: '-9999px' };
    }

    return (
      <div>
        <div style={previewStyle}>
          <div style={styles.markDown}>
            <div style={styles.markDownLabel}>
              {this.props.floatingLabelText || ''}
            </div>
            <MarkdownElement
              text={this.state.text}
            />
          </div>
        </div>
        <div style={editorStyle}>
          <TextField
            ref="textEditor"
            defaultValue={this.props.defaultValue}
            fullWidth={this.props.fullWidth}
            hintText={this.props.hintText}
            floatingLabelText={this.props.floatingLabelText || ''}
            errorText={this.state.error}
            fullWidth={true}
            multiLine={true}
            rows={4}
            onChange={this._handleChange}
            onBlur={this.validate}
          />
        </div>
        <MarkdownTools
          preview={this.state.preview}
          previewEnabled={!!this.state.text}
          handlePreviewToggle={this._handlePreviewToggle}
          handleBold={this._handleBold}
          handleItalics={this._handleItalics}
          handleQuote={this._handleQuote}
          handleStrikethrough={this._handleStrikethrough}
          handleInsertLink={this._handleInsertLink}
          handleInsertPhoto={this._handleInsertPhoto}
        />
      </div>
    );
  }

}  // End InputMarkdown

InputMarkdown.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  hintText: React.PropTypes.string.isRequired,
  defaultValue: React.PropTypes.string,
  fullWidth: React.PropTypes.bool,
  floatingLabelText: React.PropTypes.string,
  required: React.PropTypes.bool,
  minLength: React.PropTypes.number,
  maxLength: React.PropTypes.number,
};

InputMarkdown.defaultProps = {
  defaultValue: '',
  required: false,
};

const styles = {
  markDown: {
    minHeight: '148px',
  },
  markDownLabel: {
    paddingTop: '18px',
    paddingBottom: '6px',
    fontFamily: 'Roboto',
    fontWeight: 'Bold',
    fontSize: '12px',
    color: myTheme.palette.primary1Color,
  },
};
