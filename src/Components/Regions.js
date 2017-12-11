import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Regions extends Component {

  constructor(){
    super();
    this.state = {
      region: '',
      complete: false,
    }
  }

  selectRegion(region){
    this.props.onSelect(region);
    this.setState({complete: true});
  }

  onBackClick(){
    this.props.onBack();
  }

  onNextClick(){
    this.props.onNext();
  }

  render() {
    let optionItems;
    console.log(this.props.regions);
    if (this.props.regions) {
      optionItems = this.props.regions.map(region => {
        return (<button key={region.tag_id} className={region.tag_id} onClick={this.selectRegion.bind(this, region.tag_id)}>{region.name}</button>)
      });
    }

    return (
      <div className="Regions">
          <h1></h1>
          <h2><span className="light-blue">CHOOSE</span> YOUR REGION</h2>
          <h3>For the best, most relevant content experience</h3>
          <p>
            {optionItems}
          </p>
          <div className="Nav">
            <a href="#" className="light-blue" onClick={this.onBackClick.bind(this)}>&lt; Back</a>
            <a href="#" className={this.state.complete ? "show" : "hidden"} onClick={this.onNextClick.bind(this)}>Next &gt;</a>
          </div>
      </div>
    );
  }

}

Regions.propTypes = {
  regions: PropTypes.array,
  onSelect: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
}

export default Regions;
