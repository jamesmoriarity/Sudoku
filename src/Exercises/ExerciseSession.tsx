import React, { RefObject } from "react";
import { AnswerIndicator, AnswerIndicatorProps } from "../Controls/AnswerIndicator";
import { AnswerTimer, AnswerTimerProps } from "../Controls/AnswerTimer";
import Controls from "../Controls/Controls";
import { ExercisePlayButton, ExercisePlayButtonProps } from "../Controls/ExercisePlayButton";
import NoteChoices, { NoteChoicesProps } from "../Controls/NoteChoices";
import Scoreboard from "../Controls/Scoreboard";
import Frets from "../Fretboard/Frets";
import GuitarStrings from "../Fretboard/GuitarStrings";
import NoteDot, { NoteDotProps } from "../Fretboard/NoteDot";
import StaticFretboard from "../Fretboard/StaticFretboard";
import Question from "../Question";
import SettingsProxy from "../SettingsProxy";
import ExerciseHistory from "./ExerciseHistory";
import ExerciseSequence from "./ExerciseSequence";
import ExerciseSessionHistory from "./ExerciseSessionHistory";
import ExerciseSettings from "./Settings/ExerciseSettings";
import {gsap} from "gsap"

export class ExerciseSessionState{
    history:ExerciseSessionHistory
    currentQuestion:Question | null
    acceptingAnswers:boolean
    props:ExerciseSessionProps
    isPaused:boolean
    constructor(props:ExerciseSessionProps){
        this.props = props
        this.history = new ExerciseSessionHistory()
        this.acceptingAnswers = false
        this.currentQuestion = null
        this.isPaused = true
    }
    clone = () => {
        let copy:ExerciseSessionState = new ExerciseSessionState(this.props)
        copy.history = this.history.clone()
        copy.acceptingAnswers = this.acceptingAnswers
        copy.currentQuestion = (this.currentQuestion) ? this.currentQuestion.clone() : null
        return copy
    }
}

export class ExerciseSessionCurrentQuestionProxy{
    getter:Function
    constructor(getter:Function){
        this.getter = getter
    }
    get = ():Question | null => {
        let currentQuestion:Question | null = this.getter()
        return currentQuestion
    }
}

export class ExerciseSessionProps{
    children!:JSX.Element[]
    startTime:number
    settings:ExerciseSettings
    constructor(startTime:number, settings:ExerciseSettings){
        this.startTime = startTime
        this.settings = settings
    }
}

export class ExerciseSession extends React.Component{
    timerRef:RefObject<AnswerTimer>
    sequence:ExerciseSequence
    props!:ExerciseSessionProps
    state:ExerciseSessionState
    currentQuestionProxy:ExerciseSessionCurrentQuestionProxy
    interQuestionTimeLine!:TimelineLite
    constructor(props:ExerciseSessionProps){
        super(props)
        this.state = new ExerciseSessionState(props)
        this.timerRef = React.createRef()
        this.currentQuestionProxy = new ExerciseSessionCurrentQuestionProxy(this.getCurrentQuestion)
        this.sequence = new ExerciseSequence(this.getSettings, this.getCurrentQuestion)
        this.interQuestionTimeLine = gsap.timeline({paused:true})
        this.interQuestionTimeLine.call(this.showNextQuestion, [], 2)
    }
    componentDidUpdate = (prevProps:ExerciseSessionProps) => {
        if(this.props.startTime != prevProps.startTime){
            this.restart()
        }
    }
    getCurrentQuestion = ():Question|null => {
        return this.state.currentQuestion
    }
    getState = () => { return {...this.state} }
    getSettings = () => { return {...this.props.settings} }
    showNextQuestion = () => {
        if(this.state.isPaused){ return }
        let newState:ExerciseSessionState = this.state.clone()
        newState.currentQuestion = this.sequence.getNextQuestion()
        newState.acceptingAnswers = true
        newState.isPaused = false
        this.setState( newState ) 
      }
      onDotDisplayComplete = () => {
        if(!this.state.isPaused)
          this.startTimer()
      }
      startTimer = () => this.timerRef.current?.start()
      stopTimer = () => this.timerRef.current?.stopAndReset()
      onAnswer = (note:string) => {
        this.stopTimer()
        if ((!this.state.isPaused) && (this.state.currentQuestion) && this.state.acceptingAnswers) { 
          let isCorrect:boolean = (note == this.state.currentQuestion.answer)
          this.processAnswer(isCorrect)
        }
      }
      onPause = () => {
          this.interQuestionTimeLine.pause()
          this.stopTimer()
          this.setState({currentQuestion:null, isPaused:true})
      }
     
      restart = () => {
        this.interQuestionTimeLine.pause()
        this.timerRef.current?.stopAndReset()
        let s:ExerciseSessionState = new ExerciseSessionState(this.props)
        s.history.questions = []
        this.setState(s)
      }
      onStart = () => {
        if (this.state.isPaused)
            this.setState({isPaused:false}, this.showNextQuestion)
      }
      onAnswerTimeout = () => {
        this.processAnswer(false)
      }
      processAnswer = (answeredCorrectly:boolean)=>{
        if(this.state.currentQuestion == undefined){ return }
        let currentQuestion:Question = this.state.currentQuestion
        this.timerRef.current?.stopAndReset()
        let newState:any = this.state.clone()
        newState.answered = true
        newState.currentQuestion = currentQuestion.clone()
        newState.currentQuestion.answeredCorrectly = answeredCorrectly
        newState.currentQuestion.answered = true
        newState.acceptingAnswers = false
        newState.isPaused = false
        newState.history.add(newState.currentQuestion)
        this.setState(newState, this.onAnswerProcessed)
      } 
      onAnswerProcessed = () => {
        this.interQuestionTimeLine.restart()
      }
      getNoteDot = () => {
        if(!this.state.currentQuestion){return null}
        return <NoteDot {...new NoteDotProps(this.state.currentQuestion, this.onDotDisplayComplete)}/>
      }
    render(){
        return <g>
                    <StaticFretboard>
                        <Frets {...this.props.settings}/>
                        <GuitarStrings {...this.props.settings}/>
                    </StaticFretboard>
                    {this.getNoteDot()}
                    <Controls>
                      <AnswerIndicator {...new AnswerIndicatorProps(this.state.currentQuestion)} />
                      <NoteChoices {...new NoteChoicesProps(this.onAnswer)} />
                      <AnswerTimer {...new AnswerTimerProps(this.getSettings().answerTimeInSeconds, this.onAnswerTimeout)} ref={this.timerRef}/>
                      <ExercisePlayButton {...new ExercisePlayButtonProps(this.onStart, this.onPause, this.state.isPaused)}/>
                      <Scoreboard {...this.state.history.getExerciseStats()} />
                    </Controls>
                </g>
    }
    
}
export default ExerciseSession