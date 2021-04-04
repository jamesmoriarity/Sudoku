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
import Controls from "./Controls"

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
    for(let i:number = 0; i < max; i++){ 
      let b:boolean = (i < 2)
      m.set(i, b)
    }
    return m
  }
}
export class Exercise extends React.Component {
  state:ExerciseState
  noteDotsCollectionRef:RefObject<NoteDotCollection>
  answerTimerRef:RefObject<AnswerTimer>
  answerTimeInSeconds:number = GuitarTrainerSettings.QuestionTime
  dotMotionDelay:number
 	constructor(props:any){
 		super(props)
    this.state = new ExerciseState([])
    this.noteDotsCollectionRef = React.createRef()
    this.answerTimerRef = React.createRef()
    this.dotMotionDelay = 0.5
 	}
  onPause = () => {
    this.answerTimerRef.current?.pause()
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
    this.state.isPlaying = false
    let answer:Answer = new Answer(false, this.state.noteDotPropsArray[0], true)
    this.addToHistory(answer, this.onAnswerProcessed)
  }
  onAnswer = (note:string) => {
    if(!this.state.isPlaying){ return }
    this.answerTimerRef.current?.reset()
    let isCorrect:boolean = (note == this.getCurrentNoteName())
    // create an answer object with correct and question
    let answer:Answer = new Answer(isCorrect, this.state.noteDotPropsArray[0])
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
    this.setState({isPlaying:false, noteDotPropsArray:[]})
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
    this.setState({isPlaying:true, noteDotPropsArray:[nextDotProps]})
  }
  getCurrentNoteName = () => {
    if(this.state.noteDotPropsArray.length > 0){
      return this.state.noteDotPropsArray[0].noteName
    }
    return Math.random().toString()
  }
  selectNextDot = ():NoteDotProps => {
    let answer:Answer | null = this.getLatestAnswer()
    let nextDotProps:NoteDotProps = this.getNextDotProps()
    if(answer?.getNoteName() == nextDotProps.noteName){
      return this.selectNextDot()
    }
    return nextDotProps
  }
  getNextDotProps = () => {
    let stringIndex = this.getNextStringIndex()
    let fretIndex = this.getNextFretIndex()
    let selectedNoteName:string = GuitarTrainerSettings.guitar.getNoteNameForPosition(stringIndex, fretIndex)
    let lastAnswer:Answer | null = this.getLatestAnswer()
    let lastX:number = 0;
    let lastY:number = 0;
    if(lastAnswer != null){
      lastX = lastAnswer.noteDotProp.cx
      lastY = lastAnswer.noteDotProp.cy
    }
    return new NoteDotProps(fretIndex, stringIndex, this.onDotClick, selectedNoteName, this.answerTimeInSeconds, lastX, lastY, this.dotMotionDelay)
  }
  getNextFretIndex = () => {
    // get list of active frets, check each
    let activeFrets:number[] = []
    this.state.activeFrets.forEach((isActive:boolean, fretIndex:number) => {
      if(isActive){ activeFrets.push(fretIndex) }
    })
    return activeFrets[Math.floor( Math.random() * (activeFrets.length) )]
  }
  getNextStringIndex = () => {
    let activeStrings:number[] = []
    this.state.activeStrings.forEach((isActive:boolean, stringIndex:number) => {
      if(isActive){ activeStrings.push(stringIndex) }
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
      let activeFrets:Map<number, boolean> = new Map(this.state.activeFrets)
      activeFrets.set(fretProps.fretIndex, !fretProps.isActive)
      this.setState({activeFrets:activeFrets})
  }
  onStringClick = (stringProps:GuitarStringElmProps) => {
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
                <Controls>
                  <NoteChoices {...new NoteChoicesProps(this.onAnswer)} />
                  <AnswerTimer {...new AnswerTimerProps(this.answerTimeInSeconds + this.dotMotionDelay, this.onAnswerTimeout)} ref={this.answerTimerRef}/>
                  <ExercisePlayButton {...new ExercisePlayButtonProps(this.onStart, this.onPause, this.state.isPlaying)}/>
                  <AnswerIndicator {...this.getAnswerIndicatorProps()} />
                  <Scoreboard {...new ScoreboardProps(this.state.history)} />
                  <text onClick={this.restart} className="restart">[ restart ]</text>
                </Controls>
              </svg>
            </>
  }
}
export default Exercise
