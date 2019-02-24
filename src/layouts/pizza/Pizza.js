import React, { Component } from 'react'
import PizzaBox from './PizzaBox.jsx'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
    return {
        onComponentDidMount: () => {
            dispatch({ type: 'GET_PIZZAS' });
        }
    }
}

const mapStateToProps = (state) => state.pizza

const ShowLoading = (props) => {
    return (
        <p>Loading Pizzas...</p>
    )
}

const ShowOrdering = (props) => {
    return (
        <p>Placing Order...</p>
    )
}

const ShowPizzas = (props) => {
    return (
        (
            <p>Please place your order:</p>
        )
    )
}

class Pizza extends Component {
    componentDidMount() {
        this.props.onComponentDidMount();
    }

    render() {
        const pizzaCells = this.props.data.map((pizza, index) => {
            return (
                <PizzaBox
                    key={index}
                    id={index + 1}
                    image={pizza.image}
                    name={pizza.name}
                    description={pizza.description}
                    price={pizza.price}
                />)
        });

        return (
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">
                        <h1>Casa Nostra Pizzas</h1>
                        {this.props.isLoading ?
                            <ShowLoading /> :
                            ''
                        }
                        {this.props.placingOrder ?
                            <ShowOrdering /> :
                            <ShowPizzas />
                        }
                        {pizzaCells}
                    </div>
                </div>
            </main>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pizza)
