import React, { ChangeEvent, ChangeEventHandler, RefObject } from "react"
import NoteDot, {NoteDotProps} from "./NoteDot"
import StaticFretboard from "./Fretboard/StaticFretboard"
import NoteDotCollection, { NoteDotCollectionProps} from "./NoteDotCollection"
import { NoteChoices, NoteChoicesProps } from "./NoteChoices"
import GuitarTrainerSettings from "./GuitarTrainerSettings"
import Answer from "./Answer"
import Scoreboard, { ScoreboardProps } from "./Scoreboard"
import { AnswerTimer, AnswerTimerProps } from "./AnswerTimer"
import { ExercisePlayButton, ExercisePlayButtonProps } from "./ExercisePlayButton"
import {AnswerIndicator, AnswerIndicatorProps } from "./AnswerIndicator"
import Frets, { FretsProps } from "./Fretboard/Frets"
import { FretElmProps } from "./Fretboard/FretElm"
import GuitarStrings, { GuitarStringsProps } from "./Fretboard/GuitarStrings"
import { GuitarStringElmProps } from "./Fretboard/GuitarStringElm"
import Controls from "./Controls"
import {gsap, TweenLite, Power1} from "gsap"
import PositionHistory from "./PositionHistory"

export class ExerciseState{
  noteDotPropsArray:NoteDotProps[]
  history:Answer[]
  positionHistory:PositionHistory
  isPlaying:boolean
  activeStrings:Map<number, boolean>
  activeFrets:Map<number, boolean>
  settingsDisplay:boolean
  instructionsDisplay:boolean
  answerTimeInSeconds:number
  constructor(noteDotsProps:NoteDotProps[]){
    this.noteDotPropsArray = noteDotsProps
    this.history = []
    this.isPlaying = false
    this.activeStrings = this.getActiveMap(6)
    this.activeFrets = this.getActiveMap(13)
    this.settingsDisplay = false
    this.instructionsDisplay = false
    this.answerTimeInSeconds = GuitarTrainerSettings.QuestionTimeInSeconds
    let historyString:string | null = localStorage.getItem('GuitarTrainerExercisePositionHistory')
    if(historyString != null){
      this.positionHistory = PositionHistory.fromJSON(JSON.parse(historyString))
    }
    else{
      this.positionHistory = new PositionHistory()
    }
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
 	constructor(props:any){
 		super(props)
    this.state = new ExerciseState([])
    this.state.noteDotPropsArray = this.getAllActivePositions()
    this.noteDotsCollectionRef = React.createRef()
    this.answerTimerRef = React.createRef()
 	}
  onPause = () => {
    this.answerTimerRef.current?.pause()
    this.setState({isPlaying:false, noteDotPropsArray:this.getAllActivePositions()})
  }
  getAllActivePositions = () => {
    // loop through all active frets and strings
    let activeStrings:number[] = []
    this.state.activeStrings.forEach((isActive:boolean, stringIndex:number) => {
      if(isActive){ activeStrings.push(stringIndex) }
    })
    let activeFrets:number[] = []
    this.state.activeFrets.forEach((isActive:boolean, fretIndex:number) => {
      if(isActive){ activeFrets.push(fretIndex) }
    })
    let dotProps:NoteDotProps[] = []
    activeFrets.forEach((f:number) =>{
      activeStrings.forEach((s:number) => {
        let pct:number = this.state.positionHistory.getNotePCT(f, s)
        console.log("pct:" + pct)
        let prop:NoteDotProps = new NoteDotProps(f, s, pct, true)
        dotProps.push(prop)
      })
    })
    return dotProps

  }
  restart = () => {
    this.answerTimerRef.current?.reset()
    let s:ExerciseState = new ExerciseState([])
    s.activeFrets = new Map(this.state.activeFrets)
    s.activeStrings = new Map(this.state.activeStrings)
    this.setState(s)
  }
  onStart = () => {
    this.setState({isPlaying:true,noteDotPropsArray:[]}, this.nextQuestion)
  }
  onAnswerTimeout = () => {
    this.processAnswer(false)
  }
  onAnswer = (note:string) => {
    if(!this.state.isPlaying){ return }
    let isCorrect:boolean = (note == this.getCurrentNoteName())
    this.processAnswer(isCorrect)
  }
  processAnswer = (answeredCorrectly:boolean)=>{
    this.answerTimerRef.current?.reset()
    let newState:ExerciseState = {...this.state}
    newState.isPlaying = false
    let newProps:NoteDotProps = {...newState.noteDotPropsArray[0]}
    newProps.answeredCorrectly = answeredCorrectly
    newState.noteDotPropsArray[0] = newProps
    let answer:Answer = new Answer(newProps)
    newState.history.push(answer)
    newState.positionHistory.addAnswer(answer)
    this.setState(newState, this.onAnswerProcessed)
  } 
  onAnswerProcessed = () => {
    setTimeout(this.nextQuestion, 2000)
  }
  startExercise = () => {
    this.nextQuestion()
  }
  nextQuestion = () => {
    this.answerTimerRef.current?.start()
    this.showNextDotPattern()
  }
  showNextDotPattern = () => {
    let nextDotProps:NoteDotProps = this.selectNextDot()
    nextDotProps.questionStartTime = Date.now()
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
    return (answer?.noteName == nextDotProps.noteName) ? this.selectNextDot() : nextDotProps
  }
  getNextDotProps = () => {
    let stringIndex = this.getNextStringIndex()
    let fretIndex = this.getNextFretIndex()
    return new NoteDotProps(fretIndex, stringIndex)
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
  getFretsProps = () => {
    return new FretsProps(this.state.activeFrets)
  }
  getStringsProps = () => {
    return new GuitarStringsProps(this.state.activeStrings)
  }

  areSettingsOpen = () => {
    let outerElm:HTMLElement | null = document.getElementById("exercise-settings")
    let outerHeight:number = (outerElm == null) ? 0 : outerElm.offsetHeight
    return (outerHeight > 20)
  }
  hideSettings = () => {
    TweenLite.to("#exercise-settings", {height:0, duration:.1, ease:Power1.easeOut})
  }
  showSettings = () => {
    let elm:HTMLElement | null = document.getElementById("exercise-settings-inner")
    let h:number = (elm == null) ? 0 : elm.offsetHeight + 40
    TweenLite.to("#exercise-settings", {height:h, duration:.25, ease:Power1.easeOut})
  }
  toggleSettings = () => {
    return (this.areSettingsOpen()) ? this.hideSettings() : this.showSettings()
  }
  updateActiveDots = () => {
    if(!this.state.isPlaying)
      this.setState({noteDotPropsArray:this.getAllActivePositions()})
  }
  onStringToggle = (stringNum:number) => {
    let activeStrings = new Map(this.state.activeStrings)
    let activeStringVal:boolean | undefined = activeStrings.get(stringNum)
    if (activeStringVal != undefined)
      activeStrings.set(stringNum, !activeStringVal)
      this.setState({activeStrings:activeStrings}, this.updateActiveDots)
  }
  onFretToggle = (fretNum:number) => {
    let activeFrets = new Map(this.state.activeFrets)
    let activeFretVal:boolean | undefined = activeFrets.get(fretNum)
    if(activeFretVal != undefined)
      activeFrets.set(fretNum, !activeFretVal)
      this.setState({activeFrets:activeFrets}, this.updateActiveDots)
  }
  getStringOptions = () => {
    let options:JSX.Element[] = []
    for (let [index, value] of this.state.activeStrings.entries()) {
      let noteName = GuitarTrainerSettings.guitar.stringNames[index]
      let elm = <div className="exercise-settings-string-chk-container" key={"string-chk" + index}><input type="checkbox" checked={value} onChange={()=>this.onStringToggle(index)}/>{noteName}</div>
      options.push(elm)
    }
    return options
  }
  getFretOptions = () => {
    let options:JSX.Element[] = []
    for (let [index, value] of this.state.activeFrets.entries()) {
      let noteName = GuitarTrainerSettings.guitar.stringNames[index]
      let elm = <div className="exercise-settings-fret-chk-container" key={"fret-chk" + index}><input type="checkbox" checked={value} onChange={()=>this.onFretToggle(index)}/>{(index == 0) ? "Open" : index}</div>
      options.push(elm)
    }
    return options
  }
  showInstructions = () => this.setState({instructionsDisplay:true})
  hideInstructions = () => this.setState({instructionsDisplay:false})
  onTimeChange = (e:ChangeEvent<HTMLInputElement>) => {
    let n:number = Number(e.currentTarget.value) as number
    this.setState({answerTimeInSeconds:n})
  }
  render(){
    return  <>
              <div className="exercise-title-bar">
                Name the Note: <span onClick={this.toggleSettings}>Settings</span> <span onClick={this.showInstructions}>Instructions</span>
              </div>
              <div id="exercise-settings">
                <div id="exercise-settings-inner">
                  <div className="exercise-settings-group">
                    <div className="exercise-settings-group-title">Active Strings (high to low)</div>
                    {this.getStringOptions()}
                  </div>
                  <div className="exercise-settings-group">
                    <div className="exercise-settings-group-title">Active Frets</div>
                    {this.getFretOptions()}
                  </div>
                  <div className="exercise-settings-group">
                    <div className="exercise-settings-group-title">Answer Time in Seconds</div>
                    <input onChange={this.onTimeChange} value={this.state.answerTimeInSeconds} type="number" id="name" name="name" required={true} min={2} max={60} size={2}/>
                  </div>
                  <div id="close-button"><button type="button" onClick={this.hideSettings}>Close</button></div>
                </div>
              </div>
              <svg className="guitarTrainer" xmlns="http://www.w3.org/2000/svg" width="100%"
                viewBox="0 0 7400 6000">
                <StaticFretboard>
                  <Frets {...this.getFretsProps()}/>
                  <GuitarStrings {...this.getStringsProps()}/>
                </StaticFretboard>
                <NoteDotCollection {...new NoteDotCollectionProps(this.state.noteDotPropsArray)} ref={this.noteDotsCollectionRef}/>
                <Controls>
                  <NoteChoices {...new NoteChoicesProps(this.onAnswer)} />
                  <AnswerTimer {...new AnswerTimerProps(this.state.answerTimeInSeconds, this.onAnswerTimeout)} ref={this.answerTimerRef}/>
                  <ExercisePlayButton {...new ExercisePlayButtonProps(this.onStart, this.onPause, this.state.isPlaying)}/>
                  
                  <Scoreboard {...new ScoreboardProps(this.state.history)} />
                  <AnswerIndicator {...this.getAnswerIndicatorProps()} />
                  <text onClick={this.restart} className="restart">[ restart ]</text>
                </Controls>
              </svg>
            </>
  }
}
export default Exercise
