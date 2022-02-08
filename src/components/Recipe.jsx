import React from "react"
import useContentful from "../useContentful"
import styled from "styled-components"
import StarRating from "./StarRating"
import { Link, useParams } from 'react-router-dom'

const query = `
    query {
        recipeCollection {
            items {
                title, teaser, ingress, ingrediens, timeStamp, rating, howTo {
                    json
                }, 
                hero {
                    url
            }
        }
    }
}
`

const Recipe = ({setModal}) => {
    let { data, errors } = useContentful(query);
    const { id } = useParams()

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
                <Wrapper onClick={setModal}>
                    <ImgWrapper background={item.hero.url}>
                        <Teaser>{item.title}</Teaser>
                    </ImgWrapper>
                    <StarRating stars={item.rating}/>
                    <AdTxt>{item.teaser}</AdTxt>
                    {item.timeStamp && (
                        <span>{item.timeStamp}</span>
                    )}
                </Wrapper>
            ))}
        </>
    )
}


export const ImgWrapper = styled.div`
    width: 100%;
    min-height: 10rem;
    background-image: ${(props) => props.background && `url(${props.background})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
`;

export const Teaser = styled.span`
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

export const Wrapper = styled.div`
    box-shadow: 0 0 0.375rem 0 rgb(0 0 0 / 20%);
    width: 20%;
    margin: 28px 28px 0 28px;
    background: #fff;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 12px 0 rgb(0 0 0 / 40%);
    }
`;

export const AdTxt = styled.div`
    padding: 1rem 2.5rem;
`;

// const TimeStamp = styled.div`
//     border: 1px solid red;
// `;


export default Recipe;