import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
    return {
        getOrders: (did) => {
            dispatch({ type: 'GET_ORDERS', payload: did });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order
    }
}

class Order extends Component {
    componentDidMount() {
        if (this.props.order.data.length === 0)
            this.props.getOrders(this.props.user.data.did);
    }

    render() {
        const orderCells = this.props.order.data.map((order, index) => {
            return (
                <div key={index}>
                    <p>User Id: {order.userDid}</p>
                    <p>Pizza Id: {order.pizzaId}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Total: {order.total}</p>
                    <p>Order Placed: {order.orderPlacedTime}</p>
                    <p>Order Received: {order.received ? 'Yes' : 'No'}</p>
                </div>
            )
        });

        return (
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">
                        <h1>Casa Nostra Pizzas</h1>
                        <h3>Welcome back, {this.props.user.data.name}</h3>
                        { this.props.order.isLoading ?
                            <p>Loading Orders...</p> :
                            <div>
                                <p>Your Orders:</p>
                                {orderCells}
                            </div>
                        }
                    </div>
                </div>
            </main>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order)
