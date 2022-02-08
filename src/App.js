import './App.css';
import useContentful from './useContentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  BrowserRouter,
  Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import styled from 'styled-components'
// import Home from './components/Home'
// import RetroMan from './assets/download.png'
// import Header from './components/Header';
// import ArticleCollection from './components/ArticleCollection'
import ArticlePage from "./components/ArticlePage"
import Recipe from "./components/Recipe"
import RecipeModal from './components/RecipeModal';
import { useState } from 'react';

const query = `
query {
  articleCollection {
    items {
      title, ingress, mainContent {json}, articleImage {url}
    }
  }
}
`
function App() {
  let { data, errors } = useContentful(query);
  const [visible, setVisible] = useState(false);

  if (errors) {
    return (
      <span>{errors.map((error) => error.message).join(",")}</span>
    )
  }
  if (!data) return <span>Loading...</span>

  const { articleCollection } = data;

  const handleModal = () => {
    setVisible(!visible);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>hei</div>} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/:id" element={<Recipe />} />
        </Routes >
      </BrowserRouter>
    </div>
  );
}

// const Wrapper = styled.div`
//     /* background: #fff; */
//     display: flex;
//     box-shadow: 0px 3px 36px 0px rgba(92,92,92,0.8);
//     flex-flow: column;
//     align-self: center;
//     align-items: center;
//     align-content: center;
//     justify-content: center;
//     width: 50rem;
//     padding: 16px;
// `;

// const Img = styled.img`
//   background-color: #fff;
// `;

const ImgWrapper = styled.div`
    width: 100%;
    min-height: 500px;
    background-image: ${(props) => props.background && `url(${props.background})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
`;

const HeaderTxt = styled.span`
    font-size: 3rem;
    font-weight: bold;
    display: flex;
    align-self: center;
    color: #000;
    padding: 16px;
`;

const RichTxt = styled.div`
    font-size: 1.125rem;
`;

const Ingress = styled.div`
    font-weight: bolder;
    font-size: 1.125rem;
`;

const ContentWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-flow: column;
`;

export default App;