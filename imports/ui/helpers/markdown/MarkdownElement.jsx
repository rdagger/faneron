import React from 'react';
import marked from 'marked';
import './markdown.css';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

export const MarkdownElement = (props) => {
  const { text } = props;
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: marked(text) }}
    />
  );
};  // End MarkdownElement

MarkdownElement.propTypes = {
  text: React.PropTypes.string,
};
