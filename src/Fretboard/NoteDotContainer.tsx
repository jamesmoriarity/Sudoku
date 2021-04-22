import React from "react"
import Question from "../Question"
import {NoteDot, NoteDotProps} from "./NoteDot"

export class NoteDotContainer extends React.Component {
  question!:Question
 	constructor(question:Question){
 		super(question)
 	}  
  render(){
    let props:NoteDotProps = new NoteDotProps(this.question.position, this.question.answer)
    return  <g className="noteDotCollection">
              <NoteDot {...props} key={this.question.position.toString()}/>
            </g>
  }
}
export default NoteDotContainer
