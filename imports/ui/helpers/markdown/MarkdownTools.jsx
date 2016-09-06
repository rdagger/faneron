import React from 'react';
import myTheme from '../../themes/myTheme.js';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import EditorFormatBold from 'material-ui/svg-icons/editor/format-bold';
import EditorFormatItalic from 'material-ui/svg-icons/editor/format-italic';
import EditorFormatQuote from 'material-ui/svg-icons/editor/format-quote';
import EditorFormatStrikethrough from 'material-ui/svg-icons/editor/format-strikethrough';
import EditorInsertLink from 'material-ui/svg-icons/editor/insert-link';
import EditorInsertPhoto from 'material-ui/svg-icons/editor/insert-photo';

export const MarkdownTools = (props) =>
  (
  <div style={styles.toolbar}>
    <div style={styles.previewToggle}>
      <Toggle
        labelPosition="right"
        label="Preview"
        disabled={!props.previewEnabled}
        onToggle={props.handlePreviewToggle}
      />
    </div>
    <div>
      <IconButton
        tooltip="Bold"
        tooltipPosition="bottom-center"
        disabled={props.preview}
        onTouchTap={props.handleBold}
      >
        <EditorFormatBold />
      </IconButton >

      <IconButton
        tooltip="Italics"
        tooltipPosition="bottom-center"
        disabled={props.preview}
        onTouchTap={props.handleItalics}
      >
        <EditorFormatItalic />
      </IconButton >

      <IconButton
        tooltip="Quote"
        tooltipPosition="bottom-center"
        disabled={props.preview}
        onTouchTap={props.handleQuote}
      >
        <EditorFormatQuote />
      </IconButton >

      <IconButton
        tooltip="Strikethrough"
        tooltipPosition="bottom-center"
        disabled={props.preview}
        onTouchTap={props.handleStrikethrough}
      >
        <EditorFormatStrikethrough />
      </IconButton >

      <IconButton
        tooltip="Insert Link"
        tooltipPosition="bottom-center"
        disabled={props.preview}
        onTouchTap={props.handleInsertLink}
      >
        <EditorInsertLink />
      </IconButton >

      <IconButton
        tooltip="Insert Photo Link"
        tooltipPosition="bottom-center"
        disabled={props.preview}
        onTouchTap={props.handleInsertPhoto}
      >
        <EditorInsertPhoto />
      </IconButton >
    </div>
  </div>
  );
  // End MarkdownTools

MarkdownTools.propTypes = {
  preview: React.PropTypes.bool,
  previewEnabled: React.PropTypes.bool,
  handlePreviewToggle: React.PropTypes.func,
  handleBold: React.PropTypes.func,
  handleItalics: React.PropTypes.func,
  handleQuote: React.PropTypes.func,
  handleStrikethrough: React.PropTypes.func,
  handleInsertLink: React.PropTypes.func,
  handleInsertPhoto: React.PropTypes.func,
};

const styles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: myTheme.palette.accent2Color,
  },
  previewToggle: {
    padding: '12px 12px 0px 12px',
  },
};
