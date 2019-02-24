import React from 'react'
import styled from 'styled-components'

const StyledPizzaBox = styled.div`
    display: inline-flex;
    flex-direction: column;
    width: 15%;
    flex-wrap: wrap;
    margin: 1rem;
    align-items: center;
    justify-content: stretch;
    background-color: white;
    border: solid 1px rgba(0,0,0,0.56);

    & img {
        display: block;
        height: 5rem;
        margin: 1rem;
    }

    .name {
        background: red;
        color: white;
        font-weight: bold;
        width: 100%
        text-align: center;
    }

    .description {
        padding: 0.5rem;
    }
`
const pizzaBox = ({ image, name, description }) => {
    return (
        <StyledPizzaBox>
            <img src={image} alt="pizza" /><br/>
            <div className="name">{name}</div>
            <div className="description">{description}</div>
        </StyledPizzaBox>
    )
}

export default pizzaBox