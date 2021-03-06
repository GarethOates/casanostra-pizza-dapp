import React, { Component } from 'react'
import PizzaBox from './PizzaBox.jsx'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
    return {
        getPizzas: () => {
            dispatch({ type: 'GET_PIZZAS' });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        pizza: state.pizza
    }
}


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
        if (this.props.pizza.data.length === 0)
            this.props.getPizzas();
    }

    render() {
        const pizzaCells = this.props.pizza.data.map((pizza, index) => {
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
                        <h3>Welcome back, { this.props.user.data.name }</h3>
                        {this.props.pizza.isLoading ?
                            <ShowLoading /> :
                            ''
                        }
                        {this.props.pizza.placingOrder ?
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
