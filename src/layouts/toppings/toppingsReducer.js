const initialState = {
    isLoading: false,
    data: []
}

const toppingsReducer = (state = initialState, action) => {
    if (action.type === 'GETTING_TOPPINGS') {
        return Object.assign({}, state, {
            isLoading: true
        })
    }

    if (action.type === 'GOT_TOPPINGS') {
        return Object.assign({}, state, {
            data: action.payload,
            isLoading: false
        })
    }

    return state
}

export default toppingsReducer
