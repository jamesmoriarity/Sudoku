import React from "react"
import Question from "../Question"
import {NoteDot, NoteDotProps} from "./NoteDot"

export class NoteDotContainerProps{
  question:Question
  constructor(question:Question){
    this.question = question
  }
}

export class NoteDotContainer extends React.Component {
  props!:NoteDotContainerProps
 	constructor(props:NoteDotContainerProps){
 		super(props)
 	}  
  render(){
    let question:Question = this.props.question
    let dotprops:NoteDotProps = new NoteDotProps(question)
    return  <g className="noteDotCollection">
              <NoteDot {...dotprops} key={this.props.question.position.toString()}/>
            </g>
  }
}
export default NoteDotContainer
