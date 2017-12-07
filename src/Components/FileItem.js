import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileItem extends Component {

  render() {
    /*
    let tagItems;
    if (this.props.file.tags) {
      tagItems = this.props.file.tags.map(tag => {
        //console.log(project);
        return (<li key={tag.tag_id}>{tag.tag_id}</li>)
      });
    }*/
    return (
      <li className="Files">
        <b>{this.props.file.title}</b>
        <p>{this.props.file.desc} {this.props.file.name}</p>
        <p>{this.props.file.tags}</p>
      </li>
    );
  }
}

FileItem.propTypes = {
  file: PropTypes.object
}

export default FileItem;
