import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
    return {
        onComponentDidMount: () => {
            dispatch({ type: 'GET_ORDERS', payload: this.props.user.data.did });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order
    }
}

const ShowLoading = (props) => {
    return (
        <p>Loading Orders...</p>
    )
}

const ShowOrders = (props) => {
    return (
        (
            <p>Your Orders:</p>
        )
    )
}

class Order extends Component {
    componentDidMount() {
        this.props.onComponentDidMount();
    }

    render() {
        return (
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">
                        <h1>Casa Nostra Pizzas</h1>
                        <h3>Welcome back, {this.props.user.data.name}</h3>
                        { this.props.pizza.isLoading ?
                            <ShowLoading /> :
                            <ShowOrders />
                        }
                        {this.props.order.data}
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