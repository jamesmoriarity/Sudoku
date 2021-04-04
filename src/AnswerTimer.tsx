import React from "react"
import {gsap, Linear} from "gsap"

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
    circleRef:SVGCircleElement | null
    constructor(props:AnswerTimerProps){
        super(props)
        this.state = new AnswerTimerState()
        this.circleRef = null
        this.tl = gsap.timeline({paused:true})
    }
    componentDidMount(){
        gsap.set(this.circleRef, {strokeDashoffset:this.getFullStrokeDashoffset()})
        let rotate:TweenLite = gsap.to(this.circleRef, {onComplete:this.onTimeout, ease: Linear.easeNone, duration:this.props.answerTimeInSeconds, strokeDashoffset:0})
        this.tl.add(rotate)
        let turnYellow:TweenLite = gsap.to(this.circleRef, {duration:this.props.answerTimeInSeconds * .25, stroke:"orange"})
        let turnRed:TweenLite = gsap.to(this.circleRef, {duration:this.props.answerTimeInSeconds * .25, stroke:"red"})
        this.tl.add(turnYellow, this.props.answerTimeInSeconds * .5)
        this.tl.add(turnRed, this.props.answerTimeInSeconds * .75)    
    }
    start = () => {
        this.tl.restart()
    }
    onTimeout = () => {
        this.props.onTimeoutHander()
    }
    reset = () => {
        this.tl.pause()
        gsap.set(this.circleRef, {strokeDashoffset:this.getFullStrokeDashoffset()})
    }
    pause = () => {
        this.tl.pause()
    }
    getFullStrokeDashoffset = () => {
        return Math.PI * ( 900 * 2)
    }
    setProgBarRef = (e:SVGCircleElement) => this.circleRef = e
  
    render(){
        return  <g className="answerTimer">
                    <circle className="inner-ring back"/>
                    <circle className="inner-ring" strokeDasharray="5654" strokeDashoffset="0" ref={this.setProgBarRef}/>
                </g>
    }
}