import React from 'react'
import styled from "styled-components";
import Button from "./Button";

const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px;
  color: #fff;
  background-color: ${props => props.theme.normal};
  text-align: center;
`

FooterContainer.defaultProps = {
  theme: {
    normal: "#e38864",
    hover: "#1f5699"
  }
}

const Footer = () => {
  return (
      <FooterContainer>
        &copy; React corporation
      </FooterContainer>
  )
}


export default Footer
