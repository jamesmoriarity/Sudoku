import React from "react"
import { gsap, TweenLite, TimelineLite } from "gsap"
import Answer from "./Answer"

export class AnswerIndicatorProps{
    answer:Answer | null
    constructor(answer:Answer | null){
        this.answer = answer
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
      if(this.props.answer == null){ return "none" }
      return (this.props.answer.isCorrect) ? "green" : "red"
    }
    setCircleRef = (c:SVGCircleElement) => this.circleRef = c
    
    render(){
        return  <circle scale="1" id="answerIndicator" ref={this.setCircleRef} className="answerIndicator" fill="none"  />
    }
    componentDidMount(){

    }
    componentDidUpdate(){
        let off:TweenLite = gsap.set(this.circleRef, {fill: "none"})
        let on:TweenLite = gsap.set(this.circleRef, {fill: this.getFill()})
        let tl:TimelineLite = gsap.timeline()
        tl.add(off, 0)
        tl.add(on, .05)
        tl.add(off, .30)
        tl.play()
    }
}