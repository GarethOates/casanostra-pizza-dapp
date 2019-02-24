const initialState = {
    isLoading: false,
    placingOrder: false,
    data: []
}

const pizzaReducer = (state = initialState, action) => {
    if (action.type === 'LOADING_PIZZAS') {
        return Object.assign({}, state, {
            isLoading: true
        })
    }

    if (action.type === 'GOT_PIZZAS') {
        return Object.assign({}, state, {
            data: action.payload,
            isLoading: false
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

export default pizzaReducer
