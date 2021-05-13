import React from "react"
import { gsap, TweenLite, TimelineLite } from "gsap"
import Question from "../Question"

export class AnswerIndicatorProps{
    question:Question | null
    constructor(question:Question | null){
        this.question = question
    }
}
export class AnswerIndicator extends React.PureComponent{
    props!:AnswerIndicatorProps
    circleRef:SVGCircleElement | null
    constructor(props:AnswerIndicatorProps){
        super(props)
        this.circleRef = null
    }
    getFill = () => {
      if(!this.props.question?.answered){ return "none" }
      return (this.props.question.answeredCorrectly) ? "green" : "red"
    }
    setCircleRef = (c:SVGCircleElement) => this.circleRef = c
    
    render(){
        return  <circle scale="1" id="answerIndicator" ref={this.setCircleRef} className="answerIndicator" fill="none"  />
    }
    componentDidUpdate(){
        if(!this.props.question?.answered) { return }
        let off:TweenLite = gsap.set(this.circleRef, {fill: "none"})
        let on:TweenLite = gsap.set(this.circleRef, {fill: this.getFill()})
        let tl:TimelineLite = gsap.timeline()
        tl.add(off, 0)
        tl.add(on, .05)
        tl.add(off, .30)
        tl.play()
    }
}