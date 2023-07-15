const TIMER_STATE = {
    STOPPED: 'STOPPED',
    PAUSED: 'PAUSED',
    RUNNING: 'RUNNING',
}


const INITIAL_SESSION_LENGTH_MIN = 25;
const INITIAL_BREAK_LENGTH_MIN = 5;
const MAX_BEEP_COUNTER = 3;

const INITIAL_STATE = {
    timerState: TIMER_STATE.STOPPED,
    timeLeft: INITIAL_SESSION_LENGTH_MIN * 60,
    activeTimer: 'Session',
    sessionLength: INITIAL_SESSION_LENGTH_MIN,
    breakLength: INITIAL_BREAK_LENGTH_MIN,
    beepCounter: -1
}


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

const countDown = () => {
    return {
        type: 'COUNT_DOWN'
    }
}

const startStop = () => {
    return {
        type: 'START_STOP'
    }
}

const reset = () => {
    return {
        type: 'RESET'
    }
}

const timeReducer = (state = INITIAL_STATE, action) => {
    let newState = { ...state }
    console.log(state)
    switch (action.type) {
        case 'INCREMENT_BREAK':
            if (newState.timerState != TIMER_STATE.RUNNING) {
                newState.breakLength = newState.breakLength < 60 ? newState.breakLength + 1 : 60;
                if (newState.activeTimer == 'Break') {
                    newState.timeLeft = newState.breakLength * 60;
                }
            }
            break;
        case 'DECREMENT_BREAK':
            if (newState.timerState != TIMER_STATE.RUNNING) {
                newState.breakLength = newState.breakLength > 1 ? newState.breakLength - 1 : 1
                if (newState.activeTimer == 'Break') {
                    newState.timeLeft = newState.breakLength * 60;
                }
            }
            break;
        case 'INCREMENT_SESSION':
            if (newState.timerState != TIMER_STATE.RUNNING) {
                newState.sessionLength = newState.sessionLength < 60 ? newState.sessionLength + 1 : 60
                if (newState.activeTimer == 'Session') {
                    newState.timeLeft = newState.sessionLength * 60;
                }
            }
            break;
        case 'DECREMENT_SESSION':
            if (newState.timerState != TIMER_STATE.RUNNING) {
                newState.sessionLength = newState.sessionLength > 1 ? newState.sessionLength - 1 : 1
                if (newState.activeTimer == 'Session') {
                    newState.timeLeft = newState.sessionLength * 60;
                }
            }
            break;
        case 'COUNT_DOWN':
            if (newState.timerState == TIMER_STATE.RUNNING) {
                if (newState.beepCounter >= 0) {
                    newState.beepCounter += 1;
                }
                if (newState.beepCounter >= MAX_BEEP_COUNTER) {
                    newState.beepCounter = -1;
                }
                if (newState.timeLeft == 1) {
                    newState.beepCounter = 0;
                }
                if (newState.timeLeft == 0) {
                    newState.activeTimer = newState.activeTimer == 'Session' ? 'Break' : 'Session';
                    newState.timeLeft = (newState.activeTimer == 'Session' ? newState.sessionLength : newState.breakLength) * 60;
                } else {
                    newState.timeLeft -= 1
                }
            }
            break;
        case 'START_STOP':
            switch (newState.timerState) {
                case TIMER_STATE.STOPPED:
                    newState.timerState = TIMER_STATE.RUNNING
                    newState.timeLeft = (newState.activeTimer == 'Session' ? newState.sessionLength : newState.breakLength) * 60;
                    break;
                case TIMER_STATE.RUNNING:
                    newState.timerState = TIMER_STATE.PAUSED
                    break;
                case TIMER_STATE.PAUSED:
                    newState.timerState = TIMER_STATE.RUNNING
                    break;
            }
            break;
        case 'RESET':
            newState.timerState = TIMER_STATE.STOPPED;
            newState.timeLeft = newState.sessionLength * 60;
            newState.activeTimer = 'Session';
            newState.beepCounter = -1;
    }

    return newState;
}

const store = Redux.createStore(timeReducer);