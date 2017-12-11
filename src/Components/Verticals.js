import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Verticals extends Component {

  constructor(){
    super();
    this.state = {
      vertical_name: '',
      category_name: '',
      vertical_name_orig: 'Verticals',
      category_name_orig: 'Categories',
      page: 'verticals',
      complete: false,

    }
  }

  handlePageClick(event){
    //alert(event.target.value);
    this.setState({page: event.target.value});
  }

  handleVerticalSelect(event){
    this.props.onSelectVertical(event.target.value);
    this.updateVertical(event.target.value);
  }

  updateVertical(vertical_filter){
    for (var i = 0; i < this.props.verticals.length; i++) {
      if (this.props.verticals[i].tag_id === vertical_filter) {
        this.setState({vertical_name: this.props.verticals[i].name});
        break;
      }
    }
  }

  handleCategorySelect(event){
    this.props.onSelectCategory(event.target.value);
    this.updateCategory(event.target.value);
  }

  updateCategory(category_filter){
    for (var i = 0; i < this.props.categories.length; i++) {
      if (this.props.categories[i].tag_id === category_filter) {
        this.setState({category_name: this.props.categories[i].name});
        break;
      }
    }
  }

/*
  handleCheckComplete() {
    if (this.state.vertical_name !== '' && this.state.category_name !== '') {
      this.setState({complete: true});
    }
  }
*/
  onBackClick(){
    this.props.onBack();
  }

  onNextClick(){
    this.props.onNext();
  }

  componentDidMount()
  {

            this.updateVertical(this.props.vertical_filter);
            this.updateCategory(this.props.category_filter);
  }

  render() {


    let verticalItems;
    let categoryItems;
    console.log(this.props.verticals);
    if (this.props.verticals) {
      verticalItems = this.props.verticals.map(vertical => {
        return (<button className="btn-tag" value={vertical.tag_id} key={vertical.tag_id} onClick={this.handleVerticalSelect.bind(this)} >{vertical.name}</button>)
      });
    }

    if (this.props.categories) {
        categoryItems = this.props.categories.map(category => {
          return (<button className="btn-tag" value={category.tag_id} key={category.tag_id} onClick={this.handleCategorySelect.bind(this)} >{category.name}</button>)
      });
    }


    return (
      <div className="Verticals">
        <h1></h1>
        <h2><span className="light-blue">CHOOSE</span> YOUR VERTICALS</h2>
        <h3>Choose Your Desired Verticals</h3>
        <div className="subnav">
          <button disabled className="btn-tag-group"><span className="icon-lock"></span>AMERICAS</button>
          <button className={this.state.page === 'verticals' ? 'btn-tag-group-selected' : 'btn-tag-group'} value="verticals" onClick={this.handlePageClick.bind(this)} ><span className="icon-arrow"></span>{this.state.vertical_name ? this.state.vertical_name : this.state.vertical_name_orig }</button>
          <button className={this.state.page === 'categories' ? 'btn-tag-group-selected' : 'btn-tag-group'} value="categories" onClick={this.handlePageClick.bind(this)} ><span className="icon-arrow"></span>{this.state.category_name ? this.state.category_name : this.state.category_name_orig }</button>
        </div>
        {
          this.state.page === 'verticals'
            ?
            <div className="tagnav">
              {verticalItems}
            </div>
            : null
        }
        {
          this.state.page === 'categories'
            ?
            <div className="tagnav">
              {categoryItems}
            </div>
            : null
        }
        <p>If you want to change your region, tap the ‘Back’ button to the right.</p>

        <div className="Nav">
          <a href="#" className="light-blue" onClick={this.onBackClick.bind(this)}>&lt; Back</a>
          <a href="#" className={this.props.docs.length > 0 ? "show" : "hidden"} onClick={this.onNextClick.bind(this)}>Next &gt;</a>
        </div>
      </div>
    );
  }

}


Verticals.propTypes = {
  docs: PropTypes.array,
  vertical_filter: PropTypes.string,
  category_filter: PropTypes.string,
  verticals: PropTypes.array,
  categories: PropTypes.array,
  onSelectVertical: PropTypes.func,
  onSelectCategory: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
}

export default Verticals;
