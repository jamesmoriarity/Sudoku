import React, { RefObject } from "react"
import {NoteDotProps} from "./NoteDot"
import StaticFretboard from "./StaticFretboard"
import NoteDotCollection, { NoteDotCollectionProps} from "./NoteDotCollection"
import { NoteChoices, NoteChoicesProps } from "./NoteChoices"
import GuitarTrainerSettings from "./GuitarTrainerSettings"
import Answer from "./Answer"
import Scoreboard, { ScoreboardProps } from "./Scoreboard"
import { AnswerTimer, AnswerTimerProps } from "./AnswerTimer"
import { ExercisePlayButton, ExercisePlayButtonProps } from "./ExercisePlayButton"
import {AnswerIndicator, AnswerIndicatorProps } from "./AnswerIndicator"
import Frets, { FretsProps } from "./Frets"
import { FretElmProps } from "./FretElm"
import GuitarStrings, { GuitarStringsProps } from "./GuitarStrings"
import { GuitarStringElmProps } from "./GuitarStringElm"

export class ExerciseState{
  noteDotPropsArray:NoteDotProps[]
  history:Answer[]
  isPlaying:boolean
  activeStrings:Map<number, boolean>
  activeFrets:Map<number, boolean>
  constructor(noteDotsProps:NoteDotProps[]){
    this.noteDotPropsArray = noteDotsProps
    this.history = []
    this.isPlaying = false
    this.activeStrings = this.getActiveMap(6)
    this.activeFrets = this.getActiveMap(13)
  }
  getActiveMap = (max:number) => {
    let m:Map<number, boolean> = new Map()
    for(let i:number = 0; i < max; i++){ m.set(i, true)}
    return m
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
    this.answerTimerRef.current?.reset()
    this.setState({isPlaying:false, noteDotPropsArray:[]})
  }
  restart = () => {
    this.answerTimerRef.current?.reset()
    let s:ExerciseState = new ExerciseState([])
    s.activeFrets = new Map(this.state.activeFrets)
    s.activeStrings = new Map(this.state.activeStrings)
    this.setState(s)
  }
  onStart = () => {
    this.setState({isPlaying:true}, this.nextQuestion)
  }
  onAnswerTimeout = () => {
    // freeze answers
    let answer:Answer = new Answer(false, this.state.noteDotPropsArray, true)
    this.addToHistory(answer, this.onAnswerProcessed)
  }
  onAnswer = (note:string) => {
    if(!this.state.isPlaying){ return }
    this.answerTimerRef.current?.reset()
    let isCorrect:boolean = (note == this.getCurrentNoteName())
    // create an answer object with correct and question
    let answer:Answer = new Answer(isCorrect, this.state.noteDotPropsArray)
    if(isCorrect){
      this.addToHistory(answer, this.onAnswerProcessed)
    }
    else{
      this.addToHistory(answer, this.onAnswerProcessed)
    }
  }

  addToHistory = (answer:Answer, callback:() => void) => {
    let newState:ExerciseState = {...this.state}
    newState.history.push(answer)
    this.setState(newState, callback)
  } 
  onAnswerProcessed = () => {
    this.setState({noteDotPropsArray:[]})
    setTimeout(this.nextQuestion, 500)
    
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
    this.answerTimerRef.current?.start()
    this.showNextDotPattern()
  }
  showNextDotPattern = () => {
    let nextDotProps:NoteDotProps = this.selectNextDot()
    this.setState({noteDotPropsArray:[nextDotProps]})
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
    // get list of active frets, check each
    let activeFrets:number[] = []
    this.state.activeFrets.forEach((value:boolean, key:number) => {
      if(value){ activeFrets.push(key) }
    })
    return activeFrets[Math.floor( Math.random() * (activeFrets.length) )]
  }
  getNextStringIndex = () => {
    let activeStrings:number[] = []
    this.state.activeStrings.forEach((value:boolean, key:number) => {
      if(value){ activeStrings.push(key) }
    })
    return activeStrings[Math.floor( Math.random() * (activeStrings.length) )]
  }
  getLatestAnswer = ():Answer | null => {
    let l = this.state.history.length
    return (l > 0) ? this.state.history[l-1] : null
  }
  getAnswerIndicatorProps = ():AnswerIndicatorProps => {
    return new AnswerIndicatorProps(this.getLatestAnswer())
  }
  componentDidMount = () =>{
    // this.startExercise()
  }
  onFretClick = (fretProps:FretElmProps) => {
      console.log("onFretClick fretIndex:" + fretProps.fretIndex)
      let activeFrets:Map<number, boolean> = new Map(this.state.activeFrets)
      activeFrets.set(fretProps.fretIndex, !fretProps.isActive)
      this.setState({activeFrets:activeFrets})
  }
  onStringClick = (stringProps:GuitarStringElmProps) => {
      console.log("onStringClick fretIndex:" + stringProps.stringIndex)
      let activeStrings:Map<number, boolean> = new Map(this.state.activeStrings)
      activeStrings.set(stringProps.stringIndex, !stringProps.isActive)
      this.setState({activeStrings:activeStrings})
  }
  getFretsProps = () => {
    return new FretsProps(this.state.activeFrets, this.onFretClick)
  }
  getStringsProps = () => {
    return new GuitarStringsProps(this.state.activeStrings, this.onStringClick)
  }
  render(){
    return  <>
              <svg className="exercise">
                <StaticFretboard>
                  <Frets {...this.getFretsProps()}/>
                  <GuitarStrings {...this.getStringsProps()}/>
                </StaticFretboard>
                <NoteDotCollection {...new NoteDotCollectionProps(this.state.noteDotPropsArray)} ref={this.noteDotsCollectionRef}/>
                <g className="controls">
                  <NoteChoices {...new NoteChoicesProps(this.onAnswer)} />
                  <AnswerIndicator {...this.getAnswerIndicatorProps()} />
                  <Scoreboard {...new ScoreboardProps(this.state.history)} />
                  <AnswerTimer {...new AnswerTimerProps(this.answerTimeInSeconds, this.onAnswerTimeout)} ref={this.answerTimerRef}/>
                  <ExercisePlayButton {...new ExercisePlayButtonProps(this.onStart, this.onPause, this.state.isPlaying)}/>
                  <text onClick={this.restart} className="restart">[ restart ]</text>
                </g>
              </svg>
            </>
  }
}
export default Exercise
