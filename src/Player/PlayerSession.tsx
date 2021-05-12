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
import {gsap, Power1} from "gsap"
import { PlayerPattern } from "./PlayerPattern";
import Settings from "../Exercises/Settings/Settings";
import Position from "../Position";
import { timeStamp } from "console";
import NoteDotPlayer, { NoteDotPlayerProps } from "../Fretboard/NoteDotPlayer";
import Guitar from "../Utils/Guitar";
import FretElm from "../Fretboard/FretElm";
import GuitarStringElm from "../Fretboard/GuitarStringElm";
import { PlayerPosition } from "./PlayerPosition";
import Scrubber, { ScrubberProps } from "./Scrubber";

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
    hasStarted:boolean
    currentPattern:PlayerPattern | null
    stringNotes:string[]
    repeat:boolean
    constructor(props:PlayerSessionProps){
        this.props = props
        this.isPaused = true
        this.hasStarted = false
        this.currentPattern = null
        this.stringNotes = ["", "", "", "", "", ""]
        this.repeat = false
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
    patternTimeline!:TimelineLite 
    stringDotRefs:RefObject<NoteDotPlayer>[]
    scrubberRef:RefObject<Scrubber>
    constructor(props:PlayerSessionProps){
        super(props)
        this.state = new PlayerSessionState(props)
        this.stringDotRefs = []
        this.scrubberRef = React.createRef()
        this.patternTimeline = gsap.timeline({paused:true});
        this.patternTimeline.eventCallback("onUpdate", this.onTimelineUpdate)
        this.patternTimeline.eventCallback("onComplete", this.onTimelineComplete)
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
    getTimeline = ():TimelineLite => {
        return this.patternTimeline
    }
    rebuildTimeline = () => {
        console.log("rebuildTimeline")
        this.patternTimeline.pause()
        this.patternTimeline.clear()
        if(this.props.playerSequence){
            let patterns:PlayerPattern[] = this.props.playerSequence.patterns
            patterns.forEach((pattern:PlayerPattern, index:number) => {
                let baseTime:number = pattern.time
                pattern.positions.forEach( (position:PlayerPosition) => {
                    let x:number = FretElm.fretXPositions[position.fretIndex] // are there other ways to position it?
                    let y:number = GuitarStringElm.getStringY(position.stringIndex)
                    let id:string = "#" + NoteDotPlayer.getIDFromIndex(position.stringIndex)
                    if(position.intro == "slide"){
                        let slideOriginX:number = FretElm.fretXPositions[position.slideOrigin.fretIndex]
                        let slideOriginY:number = GuitarStringElm.getStringY(position.slideOrigin.stringIndex)
                        this.patternTimeline.set(id, {x:slideOriginX, y:slideOriginY, opacity:0.4}, baseTime) 
                        this.patternTimeline.to(id, {x:x, y:y, opacity:1, ease: Power1.easeInOut, duration:0.15}, baseTime + 0.1) 
                    }
                    else{
                        this.patternTimeline.set(id, {x:x, y:y}, baseTime) 
                        this.patternTimeline.set(id, {opacity:1}, baseTime)
                    }
                    let fadeStart:number = baseTime + .8
                    this.patternTimeline.to(id, {opacity:0, duration:.2}, fadeStart)              
                })
                this.patternTimeline.call(this.setPattern,[pattern], baseTime)
                this.patternTimeline.call(this.setPattern,[pattern], baseTime + 0.99)
            })
        }
    }
    setPattern = (pattern:PlayerPattern) => {
        let newStringNotes:string[] = this.state.stringNotes.concat()
        pattern.positions.forEach( (position:Position, index:number) => {
            let stringIndex:number = position.stringIndex
            let note:string = Guitar.getNoteForPosition(position)
            newStringNotes[stringIndex] = note
        })
        this.setState({currentPattern:pattern, stringNotes:newStringNotes})

    }

    componentDidMount(){
        this.props.settings
        this.rebuildTimeline()
    }
    componentDidUpdate = (prevProps:PlayerSessionProps) => {
        if(prevProps.playerSequence !== this.props.playerSequence)
            this.rebuildTimeline()
    }
    onTimelineComplete = () => {
        this.patternTimeline.progress(0)
        if(!this.state.repeat){
            this.patternTimeline.pause()
            this.setState({isPaused:true, hasStarted:false})
        }
    }
    showPattern = (pattern:PlayerPattern) => {
        this.setState({currentPattern:pattern})
    }
    onTimelineUpdate = () => {
        let isPaused:boolean = this.patternTimeline.paused()
        if(this.state.isPaused != isPaused){
            this.setPaused(isPaused)
        }
        this.scrubberRef.current?.onTimelineUpdate()
    }
    toggleRepeat = () => {
        this.setState({repeat:!this.state.repeat})
    }
    onPause = () => {
        this.patternTimeline.pause()
        this.setPaused(true)
    }
    onPlay = () => {
        if(this.patternTimeline.progress() < 1){ this.patternTimeline.play() }
        else{ this.patternTimeline.restart() }
        this.setState({hasStarted:true})
    }
    restart = () => {
        this.patternTimeline.restart()
    }
    setPaused = (b:boolean) => {
        this.setState({isPaused:b})
    }
    render(){
        let fretsProps = new FretsProps(this.props.settings.activeFrets)
        let stringsProps = new GuitarStringsProps(this.props.settings.activeStrings)
        return <g>
                    <StaticFretboard {...new StaticFretboardProps(this.state.hasStarted)}>
                        <Frets {...fretsProps}/>
                        <GuitarStrings {...stringsProps}/>
                    </StaticFretboard>
                    {this.getDots()}
                    <Controls>
                        <text className="pattern-label">
                            {this.props.playerSequence?.description} 
                        </text>
                        <text className="pattern-label-2">
                            {this.state.currentPattern?.description}
                        </text>
                        <ExercisePlayButton {...new ExercisePlayButtonProps(this.onPlay, this.onPause, this.state.isPaused)}/>
                        <Scrubber ref={this.scrubberRef} {...new ScrubberProps(this.getTimeline, this.toggleRepeat, this.state.repeat)}></Scrubber>
                    </Controls>
                </g>
    }
}
export default PlayerSession

// 3200