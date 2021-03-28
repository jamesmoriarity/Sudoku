import React, { RefObject } from "react"
import {NoteDotProps} from "./NoteDot"
import StaticFretboard from "./StaticFretboard"
import NoteDotCollection, { NoteDotCollectionProps} from "./NoteDotCollection"
import { NoteChoices, NoteChoicesProps } from "./NoteChoices"
import GuitarTrainerSettings from "./GuitarTrainerSettings"
import { Answer, TimedoutAnswer } from "./Answer"
import Scoreboard, { ScoreboardProps } from "./Scoreboard"
import { AnswerTimer, AnswerTimerProps } from "./AnswerTimer"
import { ExercisePlayButton, ExercisePlayButtonProps } from "./ExercisePlayButton"

export class ExerciseState{
  noteDotPropsArray:NoteDotProps[]
  history:Answer[]
  isPlaying:boolean
  constructor(noteDotsProps:NoteDotProps[]){
    this.noteDotPropsArray = noteDotsProps
    this.history = []
    this.isPlaying = false
  }
}
export class Exercise extends React.Component {
  state:ExerciseState
  noteDotsCollectionRef:RefObject<NoteDotCollection>
  answerTimerRef:RefObject<AnswerTimer>
  answerTimeInSeconds:number = 5
 	constructor(props:any){
 		super(props)
    this.state = new ExerciseState([])
    this.noteDotsCollectionRef = React.createRef()
    this.answerTimerRef = React.createRef()
 	}
  onPause = () => {
    this.answerTimerRef.current?.stop()
    this.setState({isPlaying:false, noteDotPropsArray:[]})
  }
  onStart = () => {
    this.setState({isPlaying:true}, this.nextQuestion)
  }
  onAnswerTimeout = () => {
    // freeze answers
    let answer:TimedoutAnswer = new TimedoutAnswer(false, this.state.noteDotPropsArray)
    this.addToHistory(answer, this.onTimedoutAnswerAddedToHistory)
  }
  onAnswer = (note:string) => {
    console.log("onAnswer")
    this.answerTimerRef.current?.stop()
    let isCorrect:boolean = (note == this.getCurrentNoteName())
    // create an answer object with correct and question
    let answer:Answer = new Answer(isCorrect, this.state.noteDotPropsArray)
    if(isCorrect){
      console.log("correct current:" + this.getCurrentNoteName() + " note:" + note)
      this.addToHistory(answer, this.onCorrectAnswerAddedToHistory)
    }
    else{
      console.log("wrong current:" + this.getCurrentNoteName() + " note:" + note)
      this.addToHistory(answer, this.onWrongAnswerAddedToHistory)
    }
  }

  addToHistory = (answer:Answer, callback:() => void) => {
    console.log("addToHistory")
    let newState:ExerciseState = {...this.state}
    newState.history.push(answer)
    this.setState(newState, callback)
  } 

  onWrongAnswerAddedToHistory = () => {
    console.log("onWrongAnswerAddedToHistory")
    this.nextQuestion()
  }

  onCorrectAnswerAddedToHistory = () => {
    console.log("onCorrectAnswerAddedToHistory")
    this.nextQuestion()
  }
  onTimedoutAnswerAddedToHistory = () => {
    console.log("onTimedoutAnswerAddedToHistory")
    this.nextQuestion()
  }
  onTimerCompleted = () => {
    // cleanup?
    this.onAnswerTimeout()
  }
  onDotClick = () => {}
  startExercise = () => {
    // setup exercise
    this.nextQuestion()
  }
  nextQuestion = () => {
    // clean up from last question / setup next question
    this.answerTimerRef.current?.start()
    this.showNextDotPattern()
  }
  showNextDotPattern = () => {
    console.log("showNextDotPattern history=" + this.state.history)
      let nextDotProps:NoteDotProps = this.selectNextDot()
      let state:ExerciseState = {...this.state}
      state.noteDotPropsArray = [nextDotProps]
      this.setState(state)
  }
  getCurrentNoteName = () => {
    return (this.state.noteDotPropsArray[0])?this.state.noteDotPropsArray[0].noteName:Math.random().toString()
  }
  selectNextDot = ():NoteDotProps => {
    let currentNoteName = this.getCurrentNoteName()
    let nextDotProps:NoteDotProps = this.getNextDotProps()
    if(currentNoteName == nextDotProps.noteName){
      return this.selectNextDot()
    }
    return nextDotProps
  }
  getNextDotProps = () => {
    let stringIndex = this.getNextStringIndex()
    let fretIndex = this.getNextFretIndex()
    let selectedNoteName:string = GuitarTrainerSettings.guitar.getNoteNameForPosition(stringIndex, fretIndex)
    return new NoteDotProps(fretIndex, stringIndex, this.onDotClick, selectedNoteName, 3)
  }
  getNextFretIndex = () => {
    let activeFrets:number[] = [0,1,2,3,4]
    return activeFrets[Math.floor( Math.random() * (activeFrets.length) )]
  }
  getNextStringIndex = () => {
    return Math.floor(Math.random() * 3)
  }
  componentDidMount = () =>{
    // this.startExercise()
  }
  render(){
    return  <>
              <text fontSize="50">Exercise</text>
              <g className="exercise">
                <StaticFretboard/>
                <NoteDotCollection {...new NoteDotCollectionProps(this.state.noteDotPropsArray)} ref={this.noteDotsCollectionRef}/>
                <NoteChoices {...new NoteChoicesProps(this.onAnswer)} />
                <Scoreboard {...new ScoreboardProps(this.state.history)} />
                <AnswerTimer {...new AnswerTimerProps(this.answerTimeInSeconds, this.onAnswerTimeout)} ref={this.answerTimerRef}/>
                <ExercisePlayButton {...new ExercisePlayButtonProps(this.onStart, this.onPause, this.state.isPlaying)}/>
              </g>
            </>
  }
}
export default Exercise
