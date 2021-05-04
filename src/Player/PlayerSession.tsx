import React, { RefObject } from "react";
import { AnswerIndicator, AnswerIndicatorProps } from "../Controls/AnswerIndicator";
import { AnswerTimer, AnswerTimerProps } from "../Controls/AnswerTimer";
import Controls from "../Controls/Controls";
import { ExercisePlayButton, ExercisePlayButtonProps } from "../Controls/ExercisePlayButton";
import NoteChoices, { NoteChoicesProps } from "../Controls/NoteChoices";
import Scoreboard from "../Controls/Scoreboard";
import Frets, { FretsProps } from "../Fretboard/Frets";
import GuitarStrings, { GuitarStringsProps } from "../Fretboard/GuitarStrings";
import NoteDot, { NoteDotProps } from "../Fretboard/NoteDot";
import StaticFretboard, { StaticFretboardProps } from "../Fretboard/StaticFretboard";
import Question from "../Question";
import SettingsProxy from "../SettingsProxy";
import ExerciseHistory from "../Exercises/ExerciseHistory";
import ExerciseSequence from "../Exercises/ExerciseSequence";
import ExerciseSettings from "../Exercises/Settings/ExerciseSettings";
import {gsap} from "gsap"
import { PlayerPattern } from "./PlayerPattern";
import Settings from "../Exercises/Settings/Settings";
import Position from "../Position";
import { timeStamp } from "console";
import NoteDotPlayer, { NoteDotPlayerProps } from "../Fretboard/NoteDotPlayer";
import Guitar from "../Utils/Guitar";
import FretElm from "../Fretboard/FretElm";
import GuitarStringElm from "../Fretboard/GuitarStringElm";
import { PlayerPosition } from "./PlayerPosition";

export class PlayerSequence{
    patterns:PlayerPattern[]
    description:string
    constructor(description:string = "", patterns:PlayerPattern[] = []){
        this.description = description
        this.patterns = patterns
    }
    static fromJSON(jsonObj:any){
        let ps:PlayerSequence = new PlayerSequence(jsonObj.playerSequence.description)
        jsonObj.playerSequence.patterns.pattern.forEach( (pattern:any) => {
            ps.patterns.push( PlayerPattern.fromJSON(pattern) )
        })
        return ps
    }
}
export class PlayerSessionSettings extends Settings{
    static timeBetweenPatterns:number = 5
    static repeat:boolean = true
    constructor(){
        super()
    }
}
export class PlayerSessionProps{
    settings:PlayerSessionSettings
    playerSequence:PlayerSequence | null
    constructor(settings:PlayerSessionSettings, playerSequence:PlayerSequence | null = null){
        this.settings = settings
        this.playerSequence =  playerSequence
    }
}
export class PlayerSessionState{
    props:PlayerSessionProps
    isPaused:boolean
    currentPattern:PlayerPattern | null
    stringNotes:string[]
    constructor(props:PlayerSessionProps){
        this.props = props
        this.isPaused = true
        this.currentPattern = null
        this.stringNotes = ["", "", "", "", "", ""]
    }
    clone = () => {
        let copy:PlayerSessionState = new PlayerSessionState(this.props)
        copy.currentPattern = (this.currentPattern) ? this.currentPattern.clone() : null
        copy.stringNotes = this.stringNotes.concat()
        return copy
    }
}

export class PlayerSession extends React.Component{
    // timerRef:RefObject<AnswerTimer>
    props!:PlayerSessionProps
    state:PlayerSessionState
    patternTimeLine!:TimelineLite 
    stringDotRefs:RefObject<NoteDotPlayer>[]
    constructor(props:PlayerSessionProps){
        super(props)
        this.state = new PlayerSessionState(props)
        this.stringDotRefs = []
        // this.timerRef = React.createRef()
        this.patternTimeLine = gsap.timeline({paused:true, repeat:-1});
    }
    getDots = ():JSX.Element[] => {
        let dots:JSX.Element[] = []
        for(let i = 0; i < 6; i++){
            let ref:RefObject<NoteDotPlayer> = React.createRef()
            let noteDotProps:NoteDotPlayerProps = new NoteDotPlayerProps(i, this.state.stringNotes[i], this.state.isPaused)
            dots.push(<NoteDotPlayer {...noteDotProps} key={"noteDot" + i}></NoteDotPlayer>)
            this.stringDotRefs.push(ref)
        }
        return dots
    }
    rebuildTimeline = () => {
        this.patternTimeLine.pause()
        this.patternTimeLine.clear()
        if(this.props.playerSequence){
            let patterns:PlayerPattern[] = this.props.playerSequence.patterns
            patterns.forEach((pattern:PlayerPattern, index:number) => {
                pattern.positions.forEach( (position:PlayerPosition) => {
                    let x:number = FretElm.fretXPositions[position.fretIndex] // are there other ways to position it?
                    let y:number = GuitarStringElm.getStringY(position.stringIndex)
                    let id:string = "#" + NoteDotPlayer.getIDFromIndex(position.stringIndex)
                    this.patternTimeLine.set(id, {x:x, y:y}, pattern.time)
                    let note:string = Guitar.getNoteForPosition(position)
                    this.patternTimeLine.call(this.setStringNote,[position.stringIndex, note], pattern.time)
                    this.patternTimeLine.to(id, {opacity:1, duration:.3}, pattern.time)
                    let fadeStart:number = pattern.time + .7
                    this.patternTimeLine.to(id, {opacity:0, duration:.3}, fadeStart)               
                })
            })
            // this.patternTimeLine.eventCallback("onComplete", this.onAnimationComplete)
        }
    }
    setStringNote = (stringIndex:number, note:string) => {
        let newStringNotes:string[] = this.state.stringNotes.concat()
        newStringNotes[stringIndex] = note
        this.setState({stringNotes:newStringNotes})
    }

    componentDidMount(){
        this.props.settings
        this.rebuildTimeline()
    }
    componentDidUpdate = (prevProps:PlayerSessionProps) => {
        if(prevProps.playerSequence !== this.props.playerSequence)
            this.rebuildTimeline()
    }
    onAnimationComplete = () => {
        if(PlayerSessionSettings.repeat)
            return
        this.setState({isPaused:true, currentPattern:null})
    }
    rebuildTimeLine = () => {
        this.patternTimeLine.kill()
        this.rebuildTimeline()
    }
    showPattern = (pattern:PlayerPattern) => {
        this.setState({currentPattern:pattern})
    }
    onPause = () => {
        this.patternTimeLine.pause()
        this.setPaused(true)
    }
    onPlay = () => {
        this.patternTimeLine.play()
        this.setPaused(false)
    }
    restart = () => {
        this.patternTimeLine.restart()
        this.setPaused(true)
    }
    setPaused = (b:boolean) => {
        this.setState({isPaused:b})
    }

    render(){
        let fretsProps = new FretsProps(this.props.settings.activeFrets)
        let stringsProps = new GuitarStringsProps(this.props.settings.activeStrings)
        return <g>
                    <StaticFretboard {...new StaticFretboardProps(this.state.isPaused)}>
                        <Frets {...fretsProps}/>
                        <GuitarStrings {...stringsProps}/>
                    </StaticFretboard>
                    {this.getDots()}
                    <Controls>
                        <text className="pattern-label">{this.state.currentPattern?.description}</text>
                      <ExercisePlayButton {...new ExercisePlayButtonProps(this.onPlay, this.onPause, this.state.isPaused)}/>
                    </Controls>
                </g>
    }
    
}
export default PlayerSession