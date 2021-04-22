import React, { RefObject } from "react"
import { AnswerTimer, AnswerTimerProps } from "../Controls/AnswerTimer"
import { ExercisePlayButton, ExercisePlayButtonProps } from "../Controls/ExercisePlayButton"
import NoteChoices, { NoteChoicesProps } from "../Controls/NoteChoices"
import Scoreboard, { ScoreboardProps } from "../Controls/Scoreboard"
import Frets from "../Fretboard/Frets"
import GuitarStrings from "../Fretboard/GuitarStrings"
import NoteDotContainer from "../Fretboard/NoteDotContainer"
import Question from "../Question"
import ExerciseHistory from "./ExerciseHistory"
import ExerciseSequence from "./ExerciseSequence"
import ExerciseSettings from "./Settings/ExerciseSettings"
import SettingsProps from "../SettingsProps"
import { AnswerIndicator, AnswerIndicatorProps } from "../Controls/AnswerIndicator"
import Controls from "../Controls/Controls"
import StaticFretboard from "../Fretboard/StaticFretboard"
import SettingsEditor from "./Settings/SettingsEditor"
import { NoteDotProps } from "../Fretboard/NoteDot"

export class ExerciseState{
    history:ExerciseHistory
    settings:ExerciseSettings
    currentQuestion:Question | undefined
    isPlaying:boolean
    constructor(){
      this.history = new ExerciseHistory()
      this.settings = new ExerciseSettings()
      this.isPlaying = false
    }
  }

class Exercise extends React.Component{
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
      this.timerRef.current?.start()
      this.setState( {isPlaying:true, currentQuestion:this.sequence.getNextQuestion()} ) 
    }
    onAnswer = (note:string) => {
      if(!this.state.isPlaying){ return }
      let isCorrect:boolean = (note == this.state.currentQuestion?.answer)
      this.processAnswer(isCorrect)
    }
    onPause = () => {
        this.timerRef.current?.pause()
    }
    restart = () => {
      this.timerRef.current?.stopAndReset()
      this.sequence.reset()
      let s:ExerciseState = new ExerciseState()
      this.setState(s)
    }
    onStart = () => {
      this.nextQuestion()
    }
    onAnswerTimeout = () => {
      this.processAnswer(false)
    }
    processAnswer = (answeredCorrectly:boolean)=>{
      this.timerRef.current?.stopAndReset()
      let newState:ExerciseState = {...this.state}
      newState.isPlaying = false
      if(this.state.currentQuestion != undefined){
        this.state.currentQuestion.answeredCorrectly = answeredCorrectly
        newState.history.add(this.state.currentQuestion)
      }
      this.setState(newState, this.onAnswerProcessed)
    } 
    onAnswerProcessed = () => {
      setTimeout(this.nextQuestion, 2000)
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
                  <NoteDotContainer {...this.state.currentQuestion}/>
                  <Controls>
                    <NoteChoices {...new NoteChoicesProps(this.onAnswer)} />
                    <AnswerTimer {...new AnswerTimerProps(this.state.settings.answerTimeInSeconds, this.onAnswerTimeout)} ref={this.timerRef}/>
                    <ExercisePlayButton {...new ExercisePlayButtonProps(this.onStart, this.onPause, this.state.isPlaying)}/>
                    <Scoreboard {...new ScoreboardProps(this.state.history)} />
                    <AnswerIndicator {...new AnswerIndicatorProps(this.state.currentQuestion)} />
                    <text onClick={this.restart} className="restart">[ restart ]</text>
                  </Controls>
                </svg>
              </>
    }
}
export default Exercise