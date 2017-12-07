import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectFilter extends Component {

  constructor(){
    super();
    this.state = {
      value: ''
    }
  }

  handleSelectChange(event){
    this.setState({value: event.target.value});
    this.props.onSelect(event.target.value);
  }

  render() {
    let optionItems;
    console.log(this.props.options);
    if (this.props.options) {
      optionItems = this.props.options.map(option => {
        return (<option value={option.tag_id} key={option.tag_id}>{option.name}</option>)
      });
    }

    return (
      <div className="SelectFilter">
          <select id="lang" onChange={this.handleSelectChange.bind(this)} value={this.state.value}>
          <option value="">Select</option>
          {optionItems}
          </select>
      </div>
    );
  }

}

SelectFilter.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func
}

export default SelectFilter;
