import React, { useState } from "react";
import useContentful from '../useContentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styled from "styled-components";
import Recipe from "./Recipe"
import { Link, useParams } from 'react-router-dom'
import { BLOCKS, INLINE } from '@contentful/rich-text-types'

const options = {
  renderNode: {
    [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
  },
  renderText: text => text.replace('!', '?'),
};

const ArticlePage = () => {

const { id } = useParams()
const query = `
query {
  article(id: "${id}") {
      title, ingress, mainContent {json}, articleImage {url}
  }
}
`

  let { data, errors } = useContentful(query);
  console.log(id);
  
    if (errors) {
      return (
        <span>{errors.map((error) => error.message).join(",")}</span>
      )
    }
    if (!data) return <span>Loading...</span>
  
    const { article } = data;
    console.log(article);
    return (
        <div className="App">
          <>
            <ImgWrapper background={article.articleImage.url}>
            </ImgWrapper>
            <ContentWrapper>
              <HeaderTxt>{article.title}</HeaderTxt>
              <Ingress>{article.ingress}</Ingress>
              <div style={{ display: "flex", flexFlow: "row" }}>
                <Recipe />
              </div>
              <RichTxt>
                {documentToReactComponents(article.mainContent.json, options)}
              </RichTxt>
            </ContentWrapper>
          </>
      </div>
    )
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

const ContentWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-flow: column;
`;

export default ArticlePage;