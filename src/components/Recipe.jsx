import React from "react"
import useContentful from "../useContentful"
import styled from "styled-components"

const query = `
    query {
        recipeCollection {
            items {
                title, teaser, ingress, ingrediens, howTo {
                    json
                }, 
                hero {
                    url
            }
        }
    }
}
`

const Recipe = () => {
    let { data, errors } = useContentful(query);

    if (errors) {
      return (
        <span>{errors.map((error) => error.message).join(",")}</span>
      )
    }
    if (!data) return <span>Loading...</span>
  
    const { recipeCollection } = data;

    return (
        <>
            {recipeCollection.items.map((item) => (
                <Wrapper>
                    <ImgWrapper background={item.hero.url}>
                        <Teaser>{item.title}</Teaser>
                    </ImgWrapper>
                    <AdTxt>{item.teaser}</AdTxt>
                </Wrapper>
            ))}
        </>
    )
}


const ImgWrapper = styled.div`
    width: 100%;
    min-height: 10rem;
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
    display: flex;
    background: gray;
    padding: 8px;
    align-self: flex-end;
    position: relative;
    bottom: -12px;
`;

const Wrapper = styled.div`
    box-shadow: 0 0 0.375rem 0 rgb(0 0 0 / 20%);
    width: 20%;
    margin: 28px 28px 0 28px;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 12px 0 rgb(0 0 0 / 40%);
    }
`;

const AdTxt = styled.div`
    padding: 2.5rem 2.5rem;
`;


export default Recipe;