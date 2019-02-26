const initialState = {
    isLoading: false,
    placingOrder: false,
    data: []
}

const orderReducer = (state = initialState, action) => {
    if (action.type === 'GETTING_ORDERS') {
        return Object.assign({}, state, {
            isLoading: true
        })
    }

    if (action.type === 'GOT_ORDERS') {
        return Object.assign({}, state, {
            data: action.payload
        })
    }

    if (action.type === 'PLACING_ORDER') {
        return Object.assign({}, state, {
            placingOrder: true
        })
    }

    if (action.type === 'PIZZA_ORDERED') {
        return Object.assign({}, state, {
            order: action.payload,
            placingOrder: false
        })
    }

    return state
}

export default orderReducer
