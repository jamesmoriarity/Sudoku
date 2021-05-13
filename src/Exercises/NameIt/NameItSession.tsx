import React from "react";
import { StaticFretboard } from "../../Fretboard/StaticFretboard";
import { Position } from "../../Guitar/Guitar";
import BaseExerciseSession, { BaseExerciseSessionProps, BaseExerciseSessionState } from "../Base/BaseExerciseSession";
import { NameItQuestionComponent, NameItQuestion } from "./NameItQuestionComponent";

export class NameItSessionProps extends BaseExerciseSessionProps{}

export class NameItSessionState{
    currentQuestion:NameItQuestion | undefined
    constructor(){}
}

export class NameItSession extends BaseExerciseSession{
    props!:NameItSessionProps
    state:NameItSessionState
    constructor(props:NameItSessionProps){
        super(props)
        this.state = new NameItSessionState()
    }
    setNextQuestion = () => {
        let pos:Position = new Position(0,0)
        let answer:string = pos.getNoteName()
        let q:NameItQuestion = new NameItQuestion([pos],answer)
        return this.setState({currentQuestionProp:q})
    }
    onQuestionComplete = () => {}
    getQuestionComponent = () => {
        if(!this.state.currentQuestion){ return <></>}
        return  <>
                    <StaticFretboard/>
                    <NameItQuestionComponent question={this.state.currentQuestion} onComplete={this.onQuestionComplete}/> 
                </>
    }
    render(){
        return this.getQuestionComponent()
    }
}