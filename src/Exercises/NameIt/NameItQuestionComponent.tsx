import React from "react";
import { GuitarSettings, Position } from "../../Guitar/GuitarSettings";
import BaseQuestionComponent, { BaseQuestion, BaseUserAnswer } from "../Base/BaseQuestionComponent";
import PropTypes from "prop-types"
import { StaticFretboard } from "../../Fretboard/StaticFretboard";
import {gsap, Linear} from "gsap"
import { immerable } from "immer";

export class NameItQuestion extends BaseQuestion{
    [immerable] = true
    constructor(positions:Position[], answer:string, autoPlay:boolean = true){
        super(positions, answer, autoPlay)
    }
}
export interface NameItQuestionComponentProps {
    guitarSettings: any,
    question: any,
    onComplete: Function
  }

export class TimelineManager{
    resultsTimeline:TimelineLite
    introTimeline:TimelineLite
    questionTimeline:TimelineLite
    client:NameItQuestionComponent
    constructor(client:NameItQuestionComponent){
        this.client = client
        this.resultsTimeline = this.getResultsTimeline()
        this.questionTimeline = this.getQuestionTimeline()
        this.introTimeline = this.getQuestionTimeline()
    }
    resetToStart = () => {
        this.resultsTimeline.seek(0).pause()
        this.questionTimeline.seek(0).pause()
        this.introTimeline.seek(0).pause()
    }
    getResultsTimeline  = ():TimelineLite => {
        let resultsTimeline:TimelineLite = gsap.timeline({paused:true, onComplete:this.client.onResultsShown})
        return resultsTimeline
    }
    updateResultsTimeline = (answeredCorrectly:boolean):void => {
        let fillColor:string = (answeredCorrectly) ? "green" : "red"
        this.resultsTimeline.to(".dots", {fill:fillColor, duration:0.15}, 0)
        this.resultsTimeline.to("#answerIndicator", {fill:fillColor, duration:0.25}, 0)
        this.resultsTimeline.to("#answerIndicator", {fill:"transparent", duration:0.25}, ">")
    }
    getIntroTimeline  = ():TimelineLite => {
        let introTimeline:TimelineLite = gsap.timeline({paused:true, onComplete:this.client.onIntroAnimationComplete})
        this.client.getQuestion().positions.forEach( (position:Position, index:number) => {
            introTimeline.to(position.getDomId(), {ease: Linear.easeNone, duration:0.35, opacity:1}, 0)
        })
        return introTimeline
    }
    getQuestionTimeline = ():TimelineLite => {
        let questionTimeline:TimelineLite = gsap.timeline({paused:true, onComplete:this.client.onQuestionTimerComplete})
        questionTimeline.to("#track", {ease: Linear.easeNone, duration:8, strokeDashoffset:0}, 0)
        return questionTimeline
    }
}

export class NameItQuestionComponent extends BaseQuestionComponent{
    props!:NameItQuestionComponentProps
    timelineManager:TimelineManager
    static propTypes:NameItQuestionComponentProps = {
        guitarSettings: PropTypes.instanceOf(GuitarSettings),
        question: PropTypes.instanceOf(NameItQuestion),
        onComplete:PropTypes.func
    }
    constructor(props:NameItQuestionComponentProps){
        super(props.question)
        this.timelineManager = new TimelineManager(this)
    }
    getQuestion = ():NameItQuestion => { return this.props.question as NameItQuestion }
    getGuitarSettings = ():GuitarSettings => { return this.props.guitarSettings as GuitarSettings}

    // events
    onCompleteHander = (question:NameItQuestion):void => { this.props.onComplete(question) }
    onComplete = () => {
        this.cleanUp()
        this.onCompleteHander(this.getQuestion())
    }
    onIntroAnimationComplete = () => {
        this.timelineManager.questionTimeline.restart()
        this.getQuestion().timeAsked = Date.now()
    }
    onQuestionTimerComplete = () => {
        this.getQuestion().resolved = true
        this.showResults()
    }
    onResultsShown = () => {
        this.onComplete()
    }
    onQuestionAnswered = (answer:string) => {
        this.timelineManager.questionTimeline.pause()
        let timeAsked:number | undefined = this.getQuestion().timeAsked
        if(timeAsked){
            let timeElapsed:number = Date.now() - timeAsked
            let userAnswer:BaseUserAnswer = new BaseUserAnswer(answer, timeElapsed)
            this.getQuestion().addUserAnswer(userAnswer)
            this.timelineManager.resultsTimeline.restart()
        }
    }
    cleanUp = () => {
        this.timelineManager.resetToStart()
    }

    showResults = () => {
        this.timelineManager.updateResultsTimeline(this.getQuestion().wasAnsweredCorrectly())
        this.timelineManager.resultsTimeline.restart()
    }

    start = () => {
        this.timelineManager.introTimeline.restart()
    }
    componentDidMount(){
        if (this.getQuestion().autoPlay)
            this.start()
    }
    getPositionDots = ():JSX.Element[] => {
        return []
    }
    render(){ 
        return <StaticFretboard {...this.props.guitarSettings}>
                    {this.getPositionDots()}
                </StaticFretboard>
            // controls
    }
}

