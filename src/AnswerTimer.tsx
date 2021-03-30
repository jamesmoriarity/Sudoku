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
        this.startTime = Date.now()
        this.interval = window.setTimeout(this.onTimeout, (this.props.answerTimeInSeconds * 1000) )
        this.updateInterval = window.setInterval(this.onUpdateInterval, 50)
    }
    onTimeout = () => {
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
    reset = () => {
        this.stop()
        this.setState({elapsedTimeInMilliseconds:0})
    }
    clearIntervals = () => {
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
                    <rect className="background-bar bar"/>
                    <rect className="foreground-bar bar" width={this.getProgressWidth()}/>
                </g>
    }
}