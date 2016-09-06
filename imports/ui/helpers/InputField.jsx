/* eslint-disable max-len */
import React from 'react';
import TextField from 'material-ui/TextField';

export default class InputField extends React.Component {
  constructor() {
    super();
    // Autobind
    this.getValue = this.getValue.bind(this);
    this.setErrorText = this.setErrorText.bind(this);
    this.validate = this.validate.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);

    // Initial State
    this.state = {
      error: '',
    };
  }  // End constructor

  setErrorText(error) {
    this.setState({ error });
  }

  getValue() {
    // Had to remove check for isMounted May need a check*************
    return this.refs.inputField && this.refs.inputField.getValue();
  }

  _handleKeyDown(e) {
    // Handle enter key press
    if (e.keyCode === 13 && this.props.onEnterKeyDown) {
      this.props.onEnterKeyDown();
    }
  }

  validate() {
    // Had to remove check for isMounted May need a check*************
    if (this.refs.inputField) {
      const fieldValue = this.refs.inputField.getValue();
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
      } else if (this.props.email) {
        // Check if email (should be last validation because it will always fire if email)
        const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (!re.test(fieldValue)) {
          errorCurrent = 'Invalid email address.';
        }
      }

			// Only change state if something actually changed
      if (errorCurrent !== errorPrevious) {
        this.setState({	error: errorCurrent });
      }

      return !errorCurrent;
    }
    return undefined;
  }


  render() {
    return (
      <div style={styles.inputWrapper}>
        <div style={styles.icon}>
          {this.props.children}
        </div>
        <TextField
          ref="inputField"
          defaultValue={this.props.defaultValue}
          disabled={this.props.disabled}
          fullWidth={this.props.fullWidth}
          hintText={this.props.hintText}
          floatingLabelText={this.props.floatingLabelText || ''}
          multiLine={this.props.multiLine}
          type={this.props.type || 'text'}
          errorText={this.state.error}
          onBlur={this.validate}
          onKeyDown={this._handleKeyDown}
        />
      </div>
    );
  }

} // End InputField

InputField.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  hintText: React.PropTypes.string.isRequired,
  floatingLabelText: React.PropTypes.string,
  fullWidth: React.PropTypes.bool,
  type: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  minLength: React.PropTypes.number,
  maxLength: React.PropTypes.number,
  multiLine: React.PropTypes.bool,
  required: React.PropTypes.bool,
  email: React.PropTypes.bool,
  children: React.PropTypes.element,
  onEnterKeyDown: React.PropTypes.func,
};

InputField.defaultProps = {
  defaultValue: '',
  disabled: false,
  required: false,
};

const styles = {
  inputWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: '5px',
  },

  icon: {
    marginRight: '5px',
  },
};
