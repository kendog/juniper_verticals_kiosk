import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DocumentItem extends Component {

  addDocument(doc){
    this.props.onAdd(doc);
  }

  removeDocument(doc){
    this.props.onRemove(doc);
  }

  toggleDocument(doc){
    if (this.props.selected) {
      this.props.onRemove(doc);
    } else {
      this.props.onAdd(doc);
    }
  }

  render() {

    return (
      <li onClick={this.toggleDocument.bind(this, this.props.doc)} className="DocumentItem">
        <div className={this.props.selected? 'checkbox-on' : 'checkbox'}></div>
        <div className="icon"></div>
        <div className="content">
          <p>CASE STUDY</p>
          <p className="light-blue">{this.props.doc.title}</p>
        </div>
      </li>
    );
  }
}

DocumentItem.propTypes = {
  doc: PropTypes.object,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  selected: PropTypes.bool,
}

export default DocumentItem;
