import React from "react"

export class AnswerIndicatorProps{
    isCorrect:boolean | undefined
    circleRef:React.RefObject<SVGElement>
    constructor(isCorrect:boolean | undefined){
        this.isCorrect = isCorrect
        this.circleRef = React.createRef()
    }
}
export class AnswerIndicator extends React.PureComponent{
    props!:AnswerIndicatorProps
    constructor(props:AnswerIndicatorProps){
        super(props)
    }
    getFill = () => {
      if(this.props.isCorrect == undefined){ return "none" }
      return (this.props.isCorrect) ? "green" : "red"
    }

    render(){
        return  <circle ref="circleRef" className="answerIndicator" fill={this.getFill()}  />
    }
}