
const incrementBreak = () => {
    return {
        type: 'INCREMENT_BREAK'
    }
}

const decrementBreak = () => {
    return {
        type: 'DECREMENT_BREAK'
    }
}

const incrementSession = () => {
    return {
        type: 'INCREMENT_SESSION'
    }
}

const decrementSession = () => {
    return {
        type: 'DECREMENT_SESSION'
    }
}

const switchActive = () => {
    return {
        type: 'SWITCH_ACTIVE'
    }
}

const play = () => {
    return {
        type: 'PLAY'
    }
}

const pause = () => {
    return {
        type: 'PAUSE'
    }
}

const reset = () => {
    return {
        type: 'RESET'
    }
}

const breakReducer = (state = 5, action) => {
    switch (action.type) {
        case 'INCREMENT_BREAK':
            return state + 1

        case 'DECREMENT_BREAK':
            return state > 1 ? state - 1 : 1
        default:
            return state
    }
}

const sessionReducer = (state = 25, action) => {
    switch (action.type) {
        case 'INCREMENT_SESSION':
            return state + 1

        case 'DECREMENT_SESSION':
            return state > 1 ? state - 1 : 1
        default:
            return state
    }
}

const activeReducer = (state = 'Session', action) => {
    switch (action.type) {
        case 'SWITCH_ACTIVE':
            return state == 'Session' ? 'Break' : 'Session'
        default:
            return state
    }
}

const timeReducer = (state = 25, action) => {
    return state
}

const rootReducer = Redux.combineReducers({
    breakLength: breakReducer,
    sessionLength: sessionReducer,
    timeLeft: timeReducer,
    currentlyActive: activeReducer
});


const store = Redux.createStore(rootReducer);