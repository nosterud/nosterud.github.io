import React from 'react'
import styled from 'styled-components'
import useContentful from '../useContentful'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import { BLOCKS, } from '@contentful/rich-text-types'

const query = `
query {
    recipe(id: "2AOMHzXxnlR3mXSpibn36T") {
        title, ingress, ingrediens, howTo {
        json
      },
      hero {
          url
        },
        ingrediensTwo {json}
    }
  }
`
const Text = ({ children }) => <ul>{children}</ul>;

const options = {
    renderNode: {
      [BLOCKS.UL_LIST]: (node, children) => <Text>{children}</Text>,
      [BLOCKS]: (node, children) => <Text>{children}</Text>,
    },
    renderText: text => text.replace('!', '?'),
  };

const RecipeModal = ({visible}) => {

    let { data, errors } = useContentful(query);
  
    if (errors) {
      return (
        <span>{errors.map((error) => error.message).join(",")}</span>
      )
    }
    if (!data) return <span>Loading...</span>
  
    const { recipe } = data;
    
    console.log(recipe);

    return (
        <ModalOverlay>
            <Modal>
                <button>x</button>
                <ImgWrapper background={recipe.hero.url}>
                    <Teaser>{recipe.title}</Teaser>
                </ImgWrapper>
                <ContentWrapper>
                    {documentToReactComponents(recipe.ingrediensTwo.json, options)}
                    <Ingrediens>{recipe.ingrediens}</Ingrediens>
                </ContentWrapper>
            </Modal>
        </ModalOverlay>
    )
}

const ModalOverlay = styled.div`
    background-color: rgba(0, 0, 0, 0.5);;
    position: fixed;
    z-index: 100;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    bottom: 0;
`;

const Modal = styled.div`
    position: relative;
    z-index: 999;
    color: #000;
    background-color: #fff;
    max-width: 800px;
    display: block;
    margin: 80px auto;
    border-radius: 16px;
`;

const ImgWrapper = styled.div`
    width: 100%;
    min-height: 30rem;
    background-image: ${(props) => props.background && `url(${props.background})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
`;

const Teaser = styled.span`
    color: #fff;
    height: fit-content;
    font-weight: bold;
    font-size: 2.5rem;
    display: flex;
    padding: 8px;
    align-self: flex-end;
    position: relative;
    bottom: 0px;
`;

const Ingrediens = styled.div`
    display: flex;
    flex-flow: column;
    border-left: 1px solid gray;
`;

const ContentWrapper =  styled.div`
    /* display: flex;
    flex-flow: row; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-columns: 1fr;
    flex-flow: column;
`;

export default RecipeModal;