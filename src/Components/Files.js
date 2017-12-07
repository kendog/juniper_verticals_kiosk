import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Files extends Component {

  constructor(){
    super();
    this.state = {
      value: ''
    }
  }

  toggleCheckbox(event){
    this.setState({value: event.target.value});
    this.props.onSelect(event.target.value);
  }

  render() {
    let fileItems;
    if (this.props.files) {
      fileItems = this.props.files.map(file => {
        //console.log("fff"file.id);
        return (<li key={file.id}>{file.title} - {file.tags}</li>)
      });
    }
    return (
      <ul className="Files">
        {fileItems}
      </ul>
    );
  }
}

Files.propTypes = {
  files: PropTypes.array,
}

export default Files;
