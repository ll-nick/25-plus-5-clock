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
            <div>
                <div id={this.props.name + "-label"} className="label">{prettyName}</div>
                <div>
                    <div id={this.props.name + "-decrement"} onClick={this.props.decrement}><i className="fa fa-arrow-down fa-2x"></i></div>
                    <div id={this.props.name + "-length"}>{this.props.length}</div>
                    <div id={this.props.name + "-increment"} onClick={this.props.increment}><i className="fa fa-arrow-up fa-2x"></i></div>
                </div>
            </div>
        )
    }
}

class Timer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>{this.props.currentlyActive}</h2>
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
        currentlyActive: state.currentlyActive
    }
};

const timerMapDispatchToProps = (dispatch) => {
    return {
        switchActive: () => {
            dispatch(switchActive())
        }
    }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;
const BreakContainer = connect(breakMapStateToProps, breakMapDispatchToProps)(TimeSetter);
const SessionContainer = connect(sessionMapStateToProps, sessionMapDispatchToProps)(TimeSetter);
const TimerContainer = connect(timerMapStateToProps, timerMapDispatchToProps)(Timer);

class Clock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="container">
                <div id="title">25 + 5 Clock</div>
                <BreakContainer name="break" />
                <SessionContainer name="session" />
                <TimerContainer />
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