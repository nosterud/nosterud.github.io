import React from 'react'
import styled from 'styled-components'

const StarRating = ({stars})  => {

    return(
        <Wrapper>
            {stars === 1 && (
                <Star className="star">&#9733;</Star>
            )}
            {stars === 2 && (
                <Star className="star">&#9733; &#9733;</Star>
            )}
            {stars === 3 && (
                <Star className="star">&#9733; &#9733; &#9733;</Star>
            )}
            {stars === 4 && (
                <Star className="star">&#9733; &#9733; &#9733; &#9733;</Star>
            )}
            {stars === 5 && (
                <Star className="star">&#9733; &#9733; &#9733; &#9733; &#9733; </Star>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 32px;
`;

const Star = styled.span`
    color: rgba(245,166,35,.8);
`;

export default StarRating;