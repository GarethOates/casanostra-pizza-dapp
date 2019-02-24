import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        user: state.user,
        pizza: state.pizza
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderPizzaClick: (event, data) => {
            event.preventDefault();

            dispatch({
                type: 'ORDER_PIZZA',
                payload: {
                    did: data.did,
                    pizzaId: data.pizzaId,
                    quantity: data.quantity
                }
            })
        }
    }
}


class OrderButton extends Component {
    render() {
        return (
            <li className="pure-menu-item">
                <a href="#" className="pure-menu-link" onClick={(event) =>
                    this.props.onOrderPizzaClick(event, {
                        did: this.props.user.data.did,
                        pizzaId: this.props.id,
                        quantity: 1
                    })
                }>
                    Order
                </a>
            </li>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderButton)
