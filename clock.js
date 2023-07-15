function Title(props) {
    return (
        <h1 id="title">25 + 5 Clock</h1>
    )
}

function TimeLabel(props) {
    return (
        <div id={props.name}>{props.time}</div>
    )
}

class TimeSetter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let prettyName = this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)
        return (
            <div id={this.props.name + "-container"} className="timer-setter-container">
                <div id={this.props.name + "-label"} className="label">{prettyName} Length</div>
                <div id={this.props.name + "-buttons"} className="time-setter-buttons">
                    <button id={this.props.name + "-decrement"} onClick={this.props.decrement} className="button"><i className="fa fa-arrow-down fa-2x"></i></button>
                    <div id={this.props.name + "-length"}>{this.props.length}</div>
                    <button id={this.props.name + "-increment"} onClick={this.props.increment} className="button"><i className="fa fa-arrow-up fa-2x"></i></button>
                </div>
            </div>
        )
    }
}

function formatTime(timeInSec) {
    // Calculate the minutes and seconds
    let minutes = Math.floor(timeInSec / 60);
    let seconds = timeInSec % 60;

    // Format the minutes and seconds as two digits
    let formattedMinutes = ('0' + minutes).slice(-2);
    let formattedSeconds = ('0' + seconds).slice(-2);

    // Update the timer display
    return formattedMinutes + ':' + formattedSeconds;

}

class Timer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.props.countDown();
            if (this.props.beepCounter == 0) {
                document.getElementById("beep").play()
            } else if (this.props.beepCounter == -1) {
                document.getElementById("beep").pause()
                document.getElementById("beep").currentTime = 0;
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let formattedTime = formatTime(this.props.timeLeft)
        return (
            <div id="timer">
                <div id="timer-label">{this.props.activeTimer}</div>
                <div id="time-left">{formattedTime}</div>
                <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
            </div>
        )
    }
}

class Controls extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="controls">
                <button id="start_stop" className="button" onClick={this.props.startStop}>
                    <i className="fa fa-play fa-2x"></i>
                    <i className="fa fa-pause fa-2x"></i>
                </button>
                <button id="reset" className="button" onClick={this.props.reset}>
                    <i className="fa fa-refresh fa-2x"></i>
                </button>
            </div>
        )
    }
}

// Connect to Redux store
const breakMapStateToProps = (state) => {
    return {
        length: state.breakLength
    }
};

const breakMapDispatchToProps = (dispatch) => {
    return {
        decrement: () => {
            dispatch(decrementBreak())
        },
        increment: () => {
            dispatch(incrementBreak())
        }
    }
};

const sessionMapStateToProps = (state) => {
    return {
        length: state.sessionLength
    }
};

const sessionMapDispatchToProps = (dispatch) => {
    return {
        decrement: () => {
            dispatch(decrementSession())
        },
        increment: () => {
            dispatch(incrementSession())
        }
    }
};

const timerMapStateToProps = (state) => {
    return {
        activeTimer: state.activeTimer,
        timeLeft: state.timeLeft,
        beepCounter: state.beepCounter
    }
};

const timerMapDispatchToProps = (dispatch) => {
    return {
        countDown: () => {
            dispatch(countDown())
        }
    }
};

const controlsMapDispatchToProps = (dispatch) => {
    return {
        startStop: () => {
            dispatch(startStop())
        },
        reset: () => {
            dispatch(reset())
        }
    }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;
const BreakContainer = connect(breakMapStateToProps, breakMapDispatchToProps)(TimeSetter);
const SessionContainer = connect(sessionMapStateToProps, sessionMapDispatchToProps)(TimeSetter);
const TimerContainer = connect(timerMapStateToProps, timerMapDispatchToProps)(Timer);
const ControlsContainer = connect(null, controlsMapDispatchToProps)(Controls);

class Clock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="container">
                <Title />
                <BreakContainer name="break" />
                <SessionContainer name="session" />
                <TimerContainer />
                <ControlsContainer />
            </div>
        );
    }
}

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Clock />
            </Provider>
        );
    }
};

// Render main component
const container = document.getElementById('app-wrapper');
const root = ReactDOM.createRoot(container);
root.render(<AppWrapper />);