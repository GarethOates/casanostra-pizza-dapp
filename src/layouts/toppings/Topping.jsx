import React from 'react'
import styled from 'styled-components'

const StyledTopping = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 1rem;
    align-items: center;
    justify-content: stretch;
`

const topping = ({ id, name, price }) => {
    return (
        <StyledTopping>
            <div>
                <input
                    type="radio"
                    id="{id}"
                    name="{name}"
                    value="{name}"
                    checked
                />
                <label for="{name}">{name} (+ Ξ{price})</label>
            </div>
        </StyledTopping>
    )
}

export default topping