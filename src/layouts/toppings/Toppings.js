import React, { Component } from 'react'
import { connect } from 'react-redux'
import Topping from './Topping'

const mapDispatchToProps = (dispatch) => {
    return {
        getToppings: () => {
            dispatch({type: 'GET_TOPPINGS'})
        }
    }
}

const mapStateToProps = (state) => {
    return {
        toppings: state.toppings
    }
}

class Toppings extends Component {
    componentDidMount() {
        if (this.props.toppings.data.length === 0) {
            this.props.getToppings();
        }
    }

    render() {
        const toppings = this.props.toppings.data.map((topping, index) => {
            return (
                <Topping
                    id={index + 1}
                    key={index}
                    name={topping.name}
                    price={topping.price}
                />
            )
        });

        return (
            <main className="container">
                <p>Please choose up to 6 toppings:</p>
                {toppings}
            </main>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Toppings)