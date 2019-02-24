import React from 'react'
import styled from 'styled-components'

const StyledPizzaBox = styled.div`
    display: inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 1rem;
    width: 15%;
    align-items: center;
    justify-content: stretch;
    background-color: white;
    border: solid 1px rgba(0,0,0,0.56);

    & img {
        display: block;
        height: 5rem;
        margin: 1rem;
    }
`
const pizzaBox = ({ image, name, description }) => {
    return (
        <StyledPizzaBox>
            <img src={image} alt="pizza" /><br/>
            <p>{name}</p>
            <p>{description}</p>
        </StyledPizzaBox>
    )
}

export default pizzaBox