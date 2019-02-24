import React from 'react'
import styled from 'styled-components'
import OrderButton from './OrderButton'

const StyledPizzaBox = styled.div`
    display: inline-flex;
    flex-direction: column;
    width: 15%;
    flex-wrap: wrap;
    margin: 1rem;
    align-items: center;
    justify-content: stretch;
    color: white;
    background-color: white;
    border: solid 1px rgba(0,0,0,0.56);
    border-radius: 20px;
    transition: all .2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }

    & img {
        display: block;
        height: 5rem;
        margin: 1rem;
    }

    .name {
        margin-top: 0.5rem;
        color: black;
        font-weight: bold;
        width: 100%
        text-align: center;
    }

    .description {
        padding: 0.5rem;
        color: black;
    }

    .price {
        margin: 0.5rem;
        color: black;
    }
`
const pizzaBox = ({ id, image, name, description, price}) => {
    return (
        <StyledPizzaBox>
            <div className="name">{name}</div>
            <img src={image} alt="pizza" /><br/>
            <div className="description">{description}</div>
            <div className="price">Ξ{price}</div>
            <OrderButton  id={id}>Order Now</OrderButton>
        </StyledPizzaBox>
    )
}

export default pizzaBox