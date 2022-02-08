import React, { useState } from "react";
import useContentful from '../useContentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styled from "styled-components";
import Recipe from "./Recipe"
import { Link, useParams } from 'react-router-dom'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

// const options = {
//   renderNode: {
//     [BLOCKS.EMBEDDED_ENTRY]: (node) => {
//         return <Recipe title={node.data.target.fields.title} description={node.data.target.fields.description} />
//     },
//   },
// }

function renderOptions(links) {
  console.log(links, "links");
  // create an asset block map
  const assetBlockMap = new Map();
  // loop through the assets and add them to the map
  for (const asset of links.assets.block) {
    assetBlockMap.set(asset.sys?.id, asset);
  }

  const entryBlockMap = new Map();
  // loop through the assets and add them to the map
  for (const entry of links.entries.block) {
    entryBlockMap.set(entry.sys.id, entry);
  }

  return {
    // other options...

    renderNode: {
      // other options...

      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        // find the entry in the entryBlockMap by ID
        const entry = entryBlockMap.get(node.data.target.sys.id);

        // render the entries as needed by looking at the __typename
        // referenced in the GraphQL query

        if (entry.__typename === 'Recipe') {
          return (
            <div style={{display: 'flex', flexFlow: 'row'}}>
              <Recipe />
            </div>
          );
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        // find the asset in the assetBlockMap by ID
        const asset = assetBlockMap.get(node.data.target.sys.id);
        console.log(asset);
        // render the asset accordingly
        return <Img src={asset.url} alt="" />;
      },
    },
  };
}


const ArticlePage = () => {

const { id } = useParams()
const query = `
query {
  article(id: "${id}") {
      title, ingress, mainContent {json, links {assets {block {url, sys {id}}}entries {block {sys {id}, __typename}}}}, articleImage {url}
  }
}
`
  let { data, errors } = useContentful(query);
  
    if (errors) {
      return (
        <span>{errors.map((error) => error.message).join(",")}</span>
      )
    }
    if (!data) return <span>Loading...</span>
  

    const { article } = data;
    console.log(article);

  
    return (
        <div>
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
                {documentToReactComponents(article.mainContent.json, renderOptions(article.mainContent.links))}
                {/* {documentToReactComponents(
                  article.mainContent.json,
                    renderOptions(article.mainContent.links)
      )} */}
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
  background-color: #fff;
`;

const Img = styled.img`
  width: 450px;
`;

export default ArticlePage;