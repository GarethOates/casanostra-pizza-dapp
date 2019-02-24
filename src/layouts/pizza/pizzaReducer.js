const initialState = {
    isLoading: false,
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

    return state
}

export default pizzaReducer
