import React, { Component } from 'react';
import styled from "styled-components";


const Button = styled.button`
  color: black !important;
  text-decoration: none;
  font-size: 15px;
  transition: all 0.5s;
  border-radius:25px;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  background-color: ${props => props.theme.normal};
  &:hover {
    color: white !important;
    background-color: ${props => props.theme.hover};
  }
`

Button.defaultProps = {
  theme: {
    normal: "#e38864",
    hover: "#1f5699"
  }
}

export default Button;
