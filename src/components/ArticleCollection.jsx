import React from "react";
import styled from "styled-components";
import useContentful from "../useContentful";
import { Wrapper, ImgWrapper, Teaser, AdTxt} from './Recipe';

const query = `
query {
  articleCollection {
    items {
      title, ingress, teaserText, mainContent {json}, articleImage {url}
    }
  }
}
`

const ArticleCollection = () => {
    let { data, errors } = useContentful(query);
  
    if (errors) {
      return (
        <span>{errors.map((error) => error.message).join(",")}</span>
      )
    }
    if (!data) return <span>Loading...</span>
  
    const { articleCollection } = data;

    return (
        <Container>
            {articleCollection.items.map((x) => (
                 <FlexWrapper>
                    <ImgWrapper background={x.articleImage.url}>
                        <Teaser>{x.title}</Teaser>
                    </ImgWrapper>
                    <AdTxt>{x.teaserText}</AdTxt>
               </FlexWrapper>
            ))}
        </Container>
    )
}

const Container = styled.div`
background: #fff;
    display: flex;
    box-shadow: 0px 3px 36px 0px rgba(92,92,92,0.8);
    flex-flow: row;
    align-self: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 50rem;
    padding: 16px;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin: 28px 28px 0 28px;
  width: 20%;
`;

// const ImgWrapper = styled.div`
//     width: 100%;
//     min-height: 500px;
//     background-image: ${(props) => props.background && `url(${props.background})`};
//     background-size: cover;
//     background-repeat: no-repeat;
//     background-position: center;
//     display: flex;
//     justify-content: center;
// `;

// const HeaderTxt = styled.span`
//     font-size: 3rem;
//     font-weight: bold;
//     display: flex;
//     align-self: center;
//     color: #000;
//     padding: 16px;
// `;

// const RichTxt = styled.div`
//     font-size: 1.125rem;
// `;

// const Ingress = styled.div`
//     font-weight: bolder;
//     font-size: 1.125rem;
// `;

// const ContentWrapper = styled.div`
//   padding: 1rem;
//   display: flex;
//   justify-content: center;
//   flex-flow: column;
// `;

export default ArticleCollection;