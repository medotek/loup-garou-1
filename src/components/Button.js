import React, { Component } from 'react';

class Button extends Component {

  onClick = this.props.onClick;
  children = this.props.children;

  render() {
    return(
      <button onClick={this.onClick}> 
        { this.children }
      </button>
    );
  }
} 

export default Button;
