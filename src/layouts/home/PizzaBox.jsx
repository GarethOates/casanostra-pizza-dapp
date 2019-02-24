import React from 'react'
import styled from 'styled-components'

const StyledPizzaBox = styled.div`
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 1rem;
    width: 25%;
    align-items: stretch;
    justify-content: stretch;
    background-color: white;
    border: solid 1px rgba(0,0,0,0.56);

    & img {
        height: 5rem;
        margin: 1rem;
    }

    .name {
        display: inline;
    }
`
const pizzaBox = ({ image, name, description }) => {
    return (
        <StyledPizzaBox>
            <img src={image} alt="pizza" />
            <div class="name">{name}</div>
            <div>{description}</div>
        </StyledPizzaBox>
    )
}

export default pizzaBox