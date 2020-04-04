import React from 'react'
import styled from "styled-components";
import Button from "./Button";
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 20px;
  color: white;
  background-color: ${props => props.theme.normal};
`
HeaderContainer.defaultProps = {
  theme: {
    normal: "#e38864",
    hover: "#1f5699"
  }
}

const Header = () => {
  return (
      <HeaderContainer>
         <Link to="/"  style={styles.link}>Loups : Gars roux</Link>
      </HeaderContainer>
  )
}

const styles = {
    link: {
        textDecoration: "none",
        color: "white",
        fontWeight:"bold"
    }
}

export default Header