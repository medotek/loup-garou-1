import React from 'react'
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";

const Body = styled.section`
  width: 100%;
  background-color: transparent;
  background: url('https://static.cdprojektred.com/playgwent.com/news/small/playgwent.com_en_1578486451_5e15cab40861f1.16672844.jpg');
  background-size:cover;
  box-sizing: border-box;
  padding: 0 10%;
  
  article {
    background-color: transparent;
    padding: 20px;
  }
`

const Layout = props => {
  return (
      <div>
        <Header />
        <Body>
          <article>
            {props.children}
          </article>
        </Body>
        <Footer />
      </div>
  )
}


export default Layout