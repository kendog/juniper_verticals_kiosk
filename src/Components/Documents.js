import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentItem from './DocumentItem';
import $ from 'jquery'

class Documents extends Component {

  constructor(){
    super();
    this.state = {
      doc_count: 0,
    }
  }

  addDocument(doc){
    this.props.onAdd(doc);
    this.setState({doc_count:this.state.doc_count+1});
  }

  removeDocument(doc){
    this.props.onRemove(doc);
    this.setState({doc_count:this.state.doc_count-1});
  }

  onBackClick(){
    this.props.onBack();
  }

  onNextClick(){
    this.props.onNext();
  }

  handleScrollDown()  {
    $( "div.docnav" ).animate({
        scrollTop: $( "div.docnav" ).scrollTop() + $( "div.docnav" ).offset().top + 25
    })
  }
  handleScrollUp()  {
    $( "div.docnav" ).animate({
        scrollTop: $( "div.docnav" ).scrollTop() - $( "div.docnav" ).offset().top - 25
    })
  }

  render() {
    let documentItems;
    if (this.props.docs) {
      documentItems = this.props.docs.map(doc => {
        //console.log(this.props.docs_selected.indexOf(doc));
        return (<DocumentItem key={doc.id} doc={doc} selected={this.props.docs_selected.indexOf(doc) >= 0 ? true:false} onAdd={this.addDocument.bind(this)} onRemove={this.removeDocument.bind(this)} />)
      });
    }
    return (
      <div className="Documents">
        <h1><img src="/images/logo-sm.png" alt="Juniper Networks"/></h1>
        <h2><span className="light-blue">AVAILABLE</span> DOCUMENTS</h2>
        <div className="subnav">
          <button disabled className="btn-tag-group">{ this.props.region_filter.replace(new RegExp('-', 'g'), ' ').toUpperCase() }</button>
          <button disabled className="btn-tag-group">{ this.props.vertical_filter.replace(new RegExp('-', 'g'), ' ').toUpperCase() }</button>
          <button disabled className="btn-tag-group">{ this.props.category_filter.replace(new RegExp('-', 'g'), ' ').toUpperCase() }</button>
        </div>
        <div className="docs">
          <div className="docs-top-left"></div>
          <div className="docs-top-right"></div>
          <h3><span className="light-blue">{ this.props.docs.length } Case Studies available.</span> Please select the files you want and press ‘Next’ to continue.</h3>
          <p>If you want to change your verticals, tap the vertical you want to change or press the ‘Back’ button below. </p>
          <div className="docnav">
            {documentItems}
          </div>
          {
            this.props.docs.length > 6
              ?<div className="scroll">
                <div className="scroll-up" onClick={this.handleScrollUp.bind(this)}></div>
                <div className="scroll-down" onClick={this.handleScrollDown.bind(this)}></div>
              </div>
              : null
          }
        </div>
        <div className="Nav">
          <a href="#" className="light-blue" onClick={this.onBackClick.bind(this)}>&lt; Back</a>
          <a href="#" className={this.props.docs_selected.length > 0 ? "show" : "hidden"} onClick={this.onNextClick.bind(this)}>Next &gt;</a>
        </div>
      </div>
    );
  }
}

Documents.propTypes = {
  docs: PropTypes.array,
  docs_selected: PropTypes.array,
  region_filter: PropTypes.string,
  vertical_filter: PropTypes.string,
  category_filter: PropTypes.string,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
}

export default Documents;
