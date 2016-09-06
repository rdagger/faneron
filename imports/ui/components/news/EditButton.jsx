import React from 'react';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';

export default class EditButton extends React.Component {
  constructor() {
    super();
    // Autobind
    this._handleNewsEdit = this._handleNewsEdit.bind(this);
  }  // End constructor

  _handleNewsEdit() {
    this.props.handleNewsEdit(this.props.entry);
  }

  render() {
    return (
      <IconButton
        tooltip="Edit News"
        tooltipPosition="top-right"
        onTouchTap={this._handleNewsEdit}
      >
        <ImageEdit color="Gray" />
      </IconButton >
    );
  }

}  // End EditButton

EditButton.propTypes = {
  entry: React.PropTypes.object.isRequired,
  handleNewsEdit: React.PropTypes.func.isRequired,
};
