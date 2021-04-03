import React from "react"
import {gsap} from "gsap"

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
    tl:TimelineLite
    barRef:SVGRectElement | null
    constructor(props:AnswerTimerProps){
        super(props)
        this.state = new AnswerTimerState()
        this.barRef = null
        this.tl = gsap.timeline({paused:true})
    }
    componentDidMount(){
        let expand:TweenLite = gsap.to(this.barRef, {duration:5, width: 1000, fill:"red", onComplete:this.onTimeout})
        this.tl.add(expand, 0)
    }
    start = () => {
        this.tl.restart()
    }
    onTimeout = () => {
        this.props.onTimeoutHander()
    }
    reset = () => {
        this.tl.pause()
        gsap.set(this.barRef, {width: 0})
    }
    setProgBarRef = (e:SVGRectElement) => this.barRef = e
  
    render(){
        return  <g className="answerTimer">
                    <rect className="background-bar bar"/>
                    <rect className="foreground-bar bar" ref={this.setProgBarRef} width="0"/>
                </g>
    }
}