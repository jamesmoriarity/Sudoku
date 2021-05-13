import React from "react";
import { Position } from "../../Guitar/Guitar";

export class BaseUserAnswer{
    answer:string
    elapsedTime:number
    constructor(answer:string, elapsedTime:number){
        this.answer = answer
        this.elapsedTime = elapsedTime
    }
}

export class BaseQuestion{
    autoPlay:boolean
    positions:Position[]
    answer:string
    userAnswer:BaseUserAnswer | undefined
    resolved:boolean
    timeAsked:number | undefined
    constructor(positions:Position[], answer:string, autoPlay:boolean = true){
        this.positions = positions
        this.answer = answer
        this.autoPlay = autoPlay
        this.resolved = false
    }
    addUserAnswer = (answer:BaseUserAnswer):void => {
        this.resolved = true
        this.userAnswer = answer
    }
    didTimeOut = ():boolean => {
        return (this.resolved && !this.userAnswer)
    }
    wasAnsweredCorrectly = ():boolean => {
        return (this.userAnswer?.answer == this.answer)
    }
}

class BaseQuestionComponent extends React.Component{
    propTypes:any
    constructor(props:BaseQuestion){
        super(props)
    }
    render(){ return <></> }
}

export default BaseQuestionComponent