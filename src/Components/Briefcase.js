import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keyboard from './Keyboard'
import $ from 'jquery'

class Briefcase extends Component {

  constructor(){
    super();
    this.state = {
      target: '',
      selected_input: 'user_first_name',
      user_first_name: '',
      user_last_name: '',
      user_email: '',
      page: 'name',
      pages: ['name', 'email'],
      complete: false,
    }
    //this.setState({selected_input: 'user_first_name'});

  }

  componentDidMount(){
    //this.setState({target: $('user_first_name')});

  }

  handleTextUpdate(key_value){

    if (this.state.selected_input === 'user_first_name') {
      this.setState({user_first_name: this.state.user_first_name + key_value});
    }

    if (this.state.selected_input === 'user_last_name') {
      this.setState({user_last_name: this.state.user_last_name + key_value});
    }

    if (this.state.selected_input === 'user_email') {
      this.setState({user_email: this.state.user_email + key_value});
    }
  }

  handleTextDelete(){

    if (this.state.selected_input === 'user_first_name') {
      this.setState({user_first_name: this.state.user_first_name.slice(0, -1)});
    }

    if (this.state.selected_input === 'user_last_name') {
      this.setState({user_last_name: this.state.user_last_name.slice(0, -1)});
    }

    if (this.state.selected_input === 'user_email') {
      this.setState({user_email: this.state.user_email.slice(0, -1)});
    }
  }

  handleInputFocus(event){
    this.setState({selected_input: event.target.name});
  }

  handleContiune(){
    this.setState({selected_input: 'user_email'});
    this.setState({page: 'email'});
  }

  handleCheckOut(){
    //alert("ss");
    var user_first_name = this.state.user_first_name;
    var user_last_name = this.state.user_last_name;
    var user_email = this.state.user_email;

    this.props.onSubmit(user_first_name + " " + user_last_name, user_email, false);
  }

  onBackClick(){
    this.props.onBack();
  }

  onNextClick(){
    this.props.onNext();
  }

  render() {

    return (
      <div className="Briefcase">
          <h1><img src="/images/logo-sm.png" alt="Juniper Networks"/></h1>
          <h2><span className="light-blue">YOUR</span> VIRTUAL <span className="light-blue">BRIEFCASE</span></h2>
          {
            this.state.page === 'name'
              ?
              <div className="inputs_container">
                <h3>Please enter your first and last names in the fields below. Tap to select each field. </h3>
                <div className="input_container_first_name">
                  <label>First Name</label><br/>
                  <input type="text" className="user_first_name" ref="user_first_name" name="user_first_name" value={this.state.user_first_name} onClick={this.handleInputFocus.bind(this)}/><br/>
                </div>
                <div className="input_container_last_name">
                  <label>Last Name</label><br/>
                  <input type="text" className="user_last_name" ref="user_last_name" name="user_last_name" value={this.state.user_last_name} onClick={this.handleInputFocus.bind(this)}/><br/>
                </div>
              </div>
              :
              <div className="inputs_container">
                <h3>You have <span className="light-blue">{this.props.docs.length}</span> files selected. Please enter your <span className="light-blue">email address</span> below.<br/>Once entered, press the ‘checkout’ button to recieve your files.</h3>
                <br/>
                <input type="text" className="user_email" ref="user_email" name="user_email" value={this.state.user_email} onClick={this.handleInputFocus.bind(this)}/><br/>
              </div>
          }

          <Keyboard onUpdate={this.handleTextUpdate.bind(this)} onDelete={this.handleTextDelete.bind(this)}/>


          <div>
          {
            this.state.page === 'name'
              ?<button className="btn-continue" onClick={this.handleContiune.bind(this)}>Continue</button>
              :<button className="btn-continue" onClick={this.handleCheckOut.bind(this)}>Ckeck Out</button>
          }
          </div>

          <div className="Nav">
            <a href="#" className="light-blue" onClick={this.onBackClick.bind(this)}>&lt; Back</a>
            <a href="#" className={this.state.complete ? "show" : "hidden"} onClick={this.onNextClick.bind(this)}>Next &gt;</a>
          </div>
      </div>
    );
  }
}

Briefcase.propTypes = {
  docs: PropTypes.array,
  onSubmit: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
}

export default Briefcase;
