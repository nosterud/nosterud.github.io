import './App.css';
import useContentful from './useContentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styled from 'styled-components'
import Recipe from "./components/Recipe"

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

  if (errors) {
    return (
      <span>{errors.map((error) => error.message).join(",")}</span>
    )
  }
  if (!data) return <span>Loading...</span>

  const { articleCollection } = data;

  console.log(articleCollection);
  return (
    <div className="App">
      {articleCollection.items.map((x) => (
        <>
          <ImgWrapper background={x.articleImage.url}>
          </ImgWrapper>
          <HeaderTxt>{x.title}</HeaderTxt>
          <Ingress>{x.ingress}</Ingress>
          <div style={{ display: "flex", flexFlow: "row" }}>
            <Recipe />
            <Recipe />
            <Recipe />
            <Recipe />
          </div>
          <RichTxt>
            {documentToReactComponents(x.mainContent.json)}
          </RichTxt>
        </>
      ))}
    </div >
  );
}


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

export default App;