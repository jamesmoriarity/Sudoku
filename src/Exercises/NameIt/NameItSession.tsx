import React from "react";
import { StaticFretboard } from "../../Fretboard/StaticFretboard";
import { Position } from "../../Guitar/Guitar";
import BaseExerciseSession, { BaseExerciseSessionProps, BaseExerciseSessionState } from "../Base/BaseExerciseSession";
import { NameItQuestionComponent, NameItQuestion } from "./NameItQuestionComponent";
import {gsap} from "gsap"
import { Sequencer } from "./Sequencer";
import { SessionHistory } from "./SessionHistory";

export class NameItSessionProps extends BaseExerciseSessionProps{}

export class NameItSessionState{
    currentQuestion:NameItQuestion
    constructor(question:NameItQuestion){
        this.currentQuestion = question
    }
}

export class NameItSession extends BaseExerciseSession{
    props!:NameItSessionProps
    state:NameItSessionState
    questionTimeline:TimelineLite
    sequencer:Sequencer
    history:SessionHistory
    constructor(props:NameItSessionProps){
        super(props)
        this.sequencer = new Sequencer()
        this.state = new NameItSessionState(this.sequencer.getFirstQuestion())
        this.questionTimeline = new TimelineLite({paused:true})
        this.questionTimeline.call(this.setNextQuestion,[],1)
        this.history = new SessionHistory()
    }
    setNextQuestion = () => {
        let question:NameItQuestion | undefined = this.sequencer.getNextQuestion()
        return (question) ? this.setCurrentQuestion(question) : this.onSessionEnd()
    }
    setCurrentQuestion = (question:NameItQuestion) => {
        this.setState({currentQuestionProp: question})
    }
    onSessionEnd = () => { 
        // show stats and replay 
    }
    onQuestionComplete = (question:NameItQuestion) => {
        this.history.add(question)
        this.questionTimeline.restart()
    }
    reset = () => {
        this.questionTimeline.pause()
        this.sequencer.reset()
        this.history.reset()
        this.setNextQuestion()

    }
    getComponents = () => {
        if(!this.state.currentQuestion){ return <></>}
        return  <NameItQuestionComponent question={this.state.currentQuestion} onComplete={this.onQuestionComplete}/> 
    }
    render(){
        return this.getComponents()
    }
}