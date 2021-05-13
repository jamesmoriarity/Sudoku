import React from "react";
import { Position } from "../../Guitar/Guitar";
import BaseQuestionComponent, { BaseQuestion } from "../Base/BaseQuestionComponent";
import PropTypes from "prop-types"

export class NameItQuestion extends BaseQuestion{
    constructor(positions:Position[], answer:string, autoPlay:boolean = true){
        super(positions, answer, autoPlay)
    }
}
export interface NameItQuestionComponentProps {
    question: any,
    onComplete: Function
  }

export class NameItQuestionComponent extends BaseQuestionComponent{
    props!:NameItQuestionComponentProps
    static propTypes:NameItQuestionComponentProps = {
        question: PropTypes.instanceOf(NameItQuestion),
        onComplete:PropTypes.func
    }
    constructor(props:NameItQuestionComponentProps){
        super(props.question)
    }
    getQuestion = ():NameItQuestion => { return this.props.question as NameItQuestion}
    render(){ 
        return <></> 
        // show dots and controls
    
    }
}

