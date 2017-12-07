import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Keyboard extends Component {

  constructor(){
    super();
    this.state = {
      page: 'letters',
      keys: {
        letters1: ['Q','W','E','R','T','Y','U','I','O','P'],
        letters2: ['A','S','D','F','G','H','J','K','L'],
        letters3: ['Z','X','C','V','B','N','M'],
        characters1: ['1','2','3','4','5','6','7','8','9','0'],
        characters2: ['-','/',':',';','(',')','$','&','@'],
        characters3: ['.',',','?','!','"',"'",'*'],
      }
    }
  }

  handleSubmit(){
    //alert("ss");
    var user_name = this.state.user_name;
    var user_email = this.state.user_email;

    this.props.onSubmit();
  }

  handleKeyPress(event){
    //alert(event.target.value);
    //this.setState({text: this.state.text + event.target.value});
    this.props.onUpdate(event.target.value)
  }

  handleAltKeyPress(event){
    if (this.state.page === 'letters')  {
      this.setState({page:'numbers'})
    } else {
      this.setState({page:'letters'})
    }
  }

  handleDeleteKeyPress(event){

    this.props.onDelete()

  }

  render() {
    let row1Items;
    if (this.state.page === 'letters') {
        row1Items = this.state.keys['letters1'].map(key => {
        //console.log(project);
        return (<button key={key} value={key} onClick={this.handleKeyPress.bind(this)}>{key}</button>)
      });
    } else {
        row1Items = this.state.keys['characters1'].map(key => {
        //console.log(project);
        return (<button key={key} value={key} onClick={this.handleKeyPress.bind(this)}>{key}</button>)
      });
    }
    let row2Items;
    if (this.state.page === 'letters') {
        row2Items = this.state.keys['letters2'].map(key => {
        //console.log(project);
        return (<button key={key} value={key} onClick={this.handleKeyPress.bind(this)}>{key}</button>)
      });
    } else {
        row2Items = this.state.keys['characters2'].map(key => {
        //console.log(project);
        return (<button key={key} value={key} onClick={this.handleKeyPress.bind(this)}>{key}</button>)
      });
    }
    let row3Items;
    if (this.state.page === 'letters') {
        row3Items = this.state.keys['letters3'].map(key => {
        //console.log(project);
        return (<button key={key} value={key} onClick={this.handleKeyPress.bind(this)}>{key}</button>)
      });
    } else {
        row3Items = this.state.keys['characters3'].map(key => {
        //console.log(project);
        return (<button key={key} value={key} onClick={this.handleKeyPress.bind(this)}>{key}</button>)
      });
    }
    return (
      <div className="Keyboard">
        <div className="key-row">
          {row1Items}
          <button className="delete" onClick={this.handleDeleteKeyPress.bind(this)}><span className="icon-delete"></span>DEL</button>
        </div>
        <div className="key-row">
          {row2Items}
        </div>
        <div className="key-row">
          {row3Items}
          <button className="alt" onClick={this.handleAltKeyPress.bind(this)}>{this.state.page === 'letters' ? '123' : 'ABC'}</button>
        </div>
        <div className="key-row">
          <button className="space-bar" value=" " onClick={this.handleKeyPress.bind(this)}> </button>
        </div>
      </div>
    );
  }
}

Keyboard.propTypes = {
  onSubmit: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
}

export default Keyboard;
