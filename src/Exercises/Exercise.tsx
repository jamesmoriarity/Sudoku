import React, { RefObject } from "react"
import { AnswerTimer, AnswerTimerProps } from "../Controls/AnswerTimer"
import { ExercisePlayButton, ExercisePlayButtonProps } from "../Controls/ExercisePlayButton"
import NoteChoices, { NoteChoicesProps } from "../Controls/NoteChoices"
import Scoreboard from "../Controls/Scoreboard"
import Frets from "../Fretboard/Frets"
import GuitarStrings from "../Fretboard/GuitarStrings"
import Question from "../Question"
import ExerciseHistory from "./ExerciseHistory"
import ExerciseSequence from "./ExerciseSequence"
import ExerciseSettings from "./Settings/ExerciseSettings"
import SettingsProps from "../SettingsProps"
import { AnswerIndicator, AnswerIndicatorProps } from "../Controls/AnswerIndicator"
import Controls from "../Controls/Controls"
import StaticFretboard from "../Fretboard/StaticFretboard"
import SettingsEditor from "./Settings/SettingsEditor"
import NoteDot, { NoteDotProps } from "../Fretboard/NoteDot"

export class ExerciseState{
    history:ExerciseHistory
    settings:ExerciseSettings
    currentQuestion:Question | undefined
    isPlaying:boolean
    acceptingAnswers:boolean
    constructor(){
      this.history = new ExerciseHistory()
      this.settings = new ExerciseSettings()
      this.isPlaying = false
      this.acceptingAnswers = false
      this.currentQuestion = undefined
    }
  }

class Exercise extends React.PureComponent{
    state:ExerciseState
    settingsProps:SettingsProps
    timerRef:RefObject<AnswerTimer>
    sequence:ExerciseSequence
    constructor(props:any){
      super(props)
      this.settingsProps = new SettingsProps(this.getSettings)
      this.state = new ExerciseState()
      this.timerRef = React.createRef()
      this.sequence = new ExerciseSequence(this.getState, this.getSettings)
    }
    getState = () => {return this.state}
    getSettings = () => { return this.state.settings}
    toggleSettingsPanel = () => {}
    toggleInstructions = () => {}
    nextQuestion = () => {
      let nextQuestion:Question = this.sequence.getNextQuestion()
      let newState:ExerciseState = {...this.state}
      newState.currentQuestion = {...nextQuestion}
      newState.isPlaying = true
      newState.acceptingAnswers = true
      this.setState( newState ) 
    }
    onDotDisplayComplete = () => {
      console.log("onDotDisplayComplete")
      if(this.state.isPlaying)
        this.startTimer()
    }
    startTimer = () => this.timerRef.current?.start()
    stopTimer = () => this.timerRef.current?.stopAndReset()
    onAnswer = (note:string) => {
      this.stopTimer()
      if (this.state.isPlaying && this.state.currentQuestion != undefined && this.state.acceptingAnswers) { 
        let isCorrect:boolean = (note == this.state.currentQuestion.answer)
        this.processAnswer(isCorrect)
      }
    }
    onPause = () => {
        this.stopTimer()
        this.setState({isPlaying:false, currentQuestion:undefined})
    }
    restart = () => {
      this.timerRef.current?.stopAndReset()
      this.sequence.reset()
      let s:ExerciseState = new ExerciseState()
      this.setState(s)
    }
    onStart = () => {
      if (!this.state.isPlaying)
        this.nextQuestion()
    }
    onAnswerTimeout = () => {
      this.processAnswer(false)
    }
    processAnswer = (answeredCorrectly:boolean)=>{
      this.timerRef.current?.stopAndReset()
      let newState:ExerciseState = {...this.state}
      newState.acceptingAnswers = false
      if(newState.currentQuestion != undefined){
        newState.currentQuestion = {...newState.currentQuestion}
        newState.currentQuestion.answeredCorrectly = answeredCorrectly
        newState.history.add(newState.currentQuestion)
      }
      this.setState(newState, this.onAnswerProcessed)
    } 
    onAnswerProcessed = () => {
      setTimeout(this.nextQuestion, 2000)
    }
    getNoteDotContainer = () => {
      if(this.state.currentQuestion == undefined){ return null }
      return 
    }
    render(){
      return  <>
                <div className="exercise-title-bar">
                  Name the Note: <span onClick={this.toggleSettingsPanel}>Settings</span> <span onClick={this.toggleInstructions}>Instructions</span>
                </div>
                <SettingsEditor {...this.settingsProps}/>
                <svg className="guitarTrainer" xmlns="http://www.w3.org/2000/svg" width="100%"
                  viewBox="0 0 7400 6000">
                  <StaticFretboard>
                    <Frets {...this.settingsProps}/>
                    <GuitarStrings {...this.settingsProps}/>
                  </StaticFretboard>
                  <NoteDot {...new NoteDotProps(this.state.currentQuestion, this.onDotDisplayComplete)}/>
                  <Controls>
                    <NoteChoices {...new NoteChoicesProps(this.onAnswer)} />
                    <AnswerTimer {...new AnswerTimerProps(this.state.settings.answerTimeInSeconds, this.onAnswerTimeout)} ref={this.timerRef}/>
                    <ExercisePlayButton {...new ExercisePlayButtonProps(this.onStart, this.onPause, this.state.isPlaying)}/>
                    <Scoreboard {...this.state.history.getExerciseStats()} />
                    <AnswerIndicator {...new AnswerIndicatorProps(this.state.currentQuestion)} />
                    <text onClick={this.restart} className="restart">[ restart ]</text>
                  </Controls>
                </svg>
              </>
    }
}
export default Exercise