import React from 'react'
import styled from 'styled-components'
import Logo from '../assets/contentful-seeklogo.com.svg'

const Header = () => {
    return (
        <HeaderNav>
            <Img src={Logo} alt="Logo" />
            <h1>Brukertest</h1>
        </HeaderNav>
    )
}

const HeaderNav = styled.div`
    width: 100vw;
    background: #fff;
    height: 80px;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 4px 16px 36px -7px rgba(191,191,191,0.8);
`;

const Img = styled.img`
    height: 50px;
    margin-right: 16px;
`;

export default Header;