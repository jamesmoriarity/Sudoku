import React, { RefObject } from "react";
import {gsap} from "gsap"
import { BaseQuestion } from "./BaseQuestionComponent";

export class BaseExerciseSessionState{
    currentQuestion:BaseQuestion | undefined
    constructor(){}
}



export class BaseExerciseSessionProps{
    children!:JSX.Element[]
    // settings:ExerciseSettings
    constructor(){
        // this.settings = settings
    }
}

export class BaseExerciseSession extends React.Component{
    //timerRef:RefObject<AnswerTimer>
    // sequence:ExerciseSequence
    props!:BaseExerciseSessionProps
    state:any
    // currentQuestionProxy:ExerciseSessionCurrentQuestionProxy
    interQuestionTimeLine!:TimelineLite
    constructor(props:BaseExerciseSessionProps){
        super(props)
        this.state = new BaseExerciseSessionState()
        // this.timerRef = React.createRef()
        // this.currentQuestionProxy = new ExerciseSessionCurrentQuestionProxy(this.getCurrentQuestion)
        // this.sequence = new ExerciseSequence(this.getSettings, this.getCurrentQuestion)
        this.interQuestionTimeLine = gsap.timeline({paused:true})
        this.interQuestionTimeLine.call(this.showNextQuestion, [], 2)
    }
    componentDidUpdate = (prevProps:BaseExerciseSessionProps) => {

    }
    getCurrentQuestion = () => {
        // return this.state.currentQuestion
    }
    getState = () => { return {...this.state} }
    // getSettings = () => { return {...this.props.settings} }
    showNextQuestion = () => {
        
        // let newState:ExerciseSessionState = this.state.clone()
        // newState.currentQuestion = this.sequence.getNextQuestion()
        // newState.acceptingAnswers = true
        // newState.isPaused = false
        // this.setState( newState ) 
      }
      onDotDisplayComplete = () => {
        //if(!this.state.isPaused)
        //  this.startTimer()
      }
      // startTimer = () => this.timerRef.current?.start()
      // stopTimer = () => this.timerRef.current?.stopAndReset()
      onAnswer = (note:string) => {
       // this.stopTimer()
        //if ((!this.state.isPaused) && (this.state.currentQuestion) && this.state.acceptingAnswers) { 
         // let isCorrect:boolean = (note == this.state.currentQuestion.answer)
         // this.processAnswer(isCorrect)
        //}
      }
      onPause = () => {
          //this.interQuestionTimeLine.pause()
         // this.stopTimer()
          //this.setState({currentQuestion:null, isPaused:true})
      }
     
      restart = () => {
        this.interQuestionTimeLine.pause()
       // this.timerRef.current?.stopAndReset()
        let s:BaseExerciseSessionState = new BaseExerciseSessionState()
      //s.history.questions = []
        this.setState(s)
      }
      onStart = () => {
            this.setState({isPaused:false}, this.showNextQuestion)
      }
      onAnswerTimeout = () => {
        this.processAnswer(false)
      }
      processAnswer = (answeredCorrectly:boolean)=>{
       // if(this.state.currentQuestion == undefined){ return }
       // let currentQuestion:Question = this.state.currentQuestion
       // this.timerRef.current?.stopAndReset()
       // let newState:any = this.state.clone()
       // newState.answered = true
       // newState.currentQuestion = currentQuestion.clone()
       // newState.currentQuestion.answeredCorrectly = answeredCorrectly
       // newState.currentQuestion.answered = true
       // newState.acceptingAnswers = false
       // newState.isPaused = false
       // newState.history.add(newState.currentQuestion)
       // this.setState(newState, this.onAnswerProcessed)
      } 
      onAnswerProcessed = () => {
       // this.interQuestionTimeLine.restart()
      }
      getNoteDot = () => {
        // if(!this.state.currentQuestion){return null}
       //  return <NoteDot {...new NoteDotProps(this.state.currentQuestion, this.onDotDisplayComplete)}/>
      }
    render(){
      /*
      let fretsProps = new FretsProps(this.props.settings.activeFrets)
      let stringsProps = new GuitarStringsProps(this.props.settings.activeStrings)
        return <g>
                    <StaticFretboard {...new StaticFretboardProps(false)}>
                        <Frets {...fretsProps}/>
                        <GuitarStrings {...stringsProps}/>
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
      */
     return <></>
    }
    
}
export default BaseExerciseSession