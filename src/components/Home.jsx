import React from 'react';
import RetroMan from '../assets/download.png'
import Header from '../components/Header';
import ArticleCollection from '../components/ArticleCollection'
import styled from 'styled-components'

const Home = () => {
    return (
        <div>
            <Header />
            <Wrapper>
                <Img src={RetroMan} alt="retro man" />
                <h1>Psst, Welcome</h1>
            </Wrapper>
            <ArticleCollection />
        </div>
    )
}

const Wrapper = styled.div`
    background: #fff;
    display: flex;
    box-shadow: 0px 3px 36px 0px rgba(92,92,92,0.8);
    flex-flow: column;
    align-self: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 50rem;
    padding: 16px;
    margin-bottom: 2.5rem;
`;

const Img = styled.img`
    background-color: #fff;
`;

export default Home;