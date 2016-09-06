import React from 'react';

import SelectField from 'material-ui/SelectField';

export default class InputDropdown extends React.Component {
  constructor(props) {
    super(props);
    // Autobind
    this.getValue = this.getValue.bind(this);
    this._handleValueChange = this._handleValueChange.bind(this);
    this.validate = this.validate.bind(this);

    // Initial State
    this.state = {
      selectValue: props.defaultValue,
      error: '',
    };
  }  // End constructor

  getValue() {
    // Had to remove check for isMounted May need a check*************
    return this.state.selectValue;
  }

  _handleValueChange(event, index, value) {
    this.setState({ selectValue: value }, this.validate);
  }

  validate() {
    // Had to remove check for isMounted May need a check*************
    const fieldValue = this.state.selectValue;
    const errorPrevious = this.state.error;
    let errorCurrent = '';

    // Check if required
    if (this.props.required && fieldValue === '') {
      errorCurrent = `${this.props.fieldName} required.`;
    }
    // Only change state if something actually changed
    if (errorCurrent !== errorPrevious) {
      this.setState({	error: errorCurrent });
    }
    return !errorCurrent;
  }

  render() {
    return (
      <div style={styles.dropdownWrapper}>
        <div style={styles.icon}>
					{this.props.children}
        </div>
        <SelectField
          ref="selectField"
          value={this.state.selectValue}
          floatingLabelText={this.props.floatingLabelText}
          errorText={this.state.error}
          errorStyle={styles.errorMessage}
          maxHeight={300}
          onChange={this._handleValueChange}
        >
          {this.props.menuItems}
        </SelectField>
      </div>
		);
  }

}  // End InputDropdown

InputDropdown.propTypes = {
  menuItems: React.PropTypes.array.isRequired,
  fieldName: React.PropTypes.string.isRequired,
  defaultValue: React.PropTypes.string,
  floatingLabelText: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  required: React.PropTypes.bool,
  children: React.PropTypes.element,
};

InputDropdown.defaultProps = {
  defaultValue: '',
};

const styles = {
  dropdownWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },

  icon: {
    margin: '20px 5px 0px 0px',
  },

  errorMessage: {
    bottom: '10px',
  },
};
