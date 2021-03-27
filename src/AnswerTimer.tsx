import React from "react"

export class AnswerTimerState{
    elapsedTimeInMilliseconds:number
    constructor(elapsedTimeInMilliseconds:number = 0){
        this.elapsedTimeInMilliseconds = elapsedTimeInMilliseconds
    }
}
export class AnswerTimerProps{
    answerTimeInSeconds:number
    progressBarWidth:number = 1000
    onTimeoutHander:Function
    constructor(answerTimeInSeconds:number, onTimeoutHander:Function){
        this.answerTimeInSeconds = answerTimeInSeconds
        this.onTimeoutHander = onTimeoutHander
    }
}
export class AnswerTimer extends React.Component{
    props!:AnswerTimerProps
    interval:number | undefined
    updateInterval:number | undefined
    startTime:number | undefined
    state:AnswerTimerState
    constructor(props:AnswerTimerProps){
        super(props)
        this.state = new AnswerTimerState()
    }
    start = () => {
        console.log("start")
        this.startTime = Date.now()
        this.interval = window.setTimeout(this.onTimeout, (this.props.answerTimeInSeconds * 1000) )
        this.updateInterval = window.setInterval(this.onUpdateInterval, 50)
    }
    onTimeout = () => {
        console.log("onTimeout")
        this.clearIntervals()
        this.props.onTimeoutHander()
    }
    onUpdateInterval = () => {
        let newTime:number = Date.now()
        let elapsed:number = newTime - this.startTime!
        this.setState({elapsedTimeInMilliseconds:elapsed})
    }
    stop = () => {
        this.clearIntervals()
    }
    clearIntervals = () => {
        console.log("onUpdateInterval")
        clearInterval(this.updateInterval)
        this.updateInterval = undefined
        clearTimeout(this.interval)
        this.interval = undefined

    }
    getProgressWidth = () => {
        let pct:number = this.state.elapsedTimeInMilliseconds/(this.props.answerTimeInSeconds * 1000)
        return Math.floor(pct * this.props.progressBarWidth)
    }

    render(){
        return  <g className="answerTimer">
                    <rect width={this.props.progressBarWidth} height="50" fill="grey"/>
                    <rect width={this.getProgressWidth()} height="50" fill="white"/>
                </g>
    }
}