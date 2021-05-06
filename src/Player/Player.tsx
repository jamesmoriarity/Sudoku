import parser from "fast-xml-parser"
import React, { RefObject } from "react"
import Exercise from "../Exercises/Exercise"
import ExerciseSession, { ExerciseSessionProps } from "../Exercises/ExerciseSession"
import SettingsEditor, { SettingsEditorProps } from "../Exercises/Settings/SettingsEditor"
import Position from "../Position"
import { PlayerPattern } from "./PlayerPattern"
import PlayerSession, { PlayerSequence, PlayerSessionProps, PlayerSessionSettings } from "./PlayerSession"

export class PlayerState{
    settings:PlayerSessionSettings
    startTime:number
    playerSequence:PlayerSequence | null
    constructor(){
      this.settings = new PlayerSessionSettings()
      this.startTime = Date.now()
      this.playerSequence = null
    }
  }

export class Player extends React.PureComponent{
    state:PlayerState
    request:XMLHttpRequest = new XMLHttpRequest()
    constructor(props:any){
      super(props)
      this.state = new PlayerState()
      this.request = new XMLHttpRequest()
    }
    componentDidMount = () => {
        // load the xml document, turn it into json and see what we get
        this.loadPlayerSequence()
    }
    loadPlayerSequence = () => {
      this.request.onload = this.onPlayerSequenceLoaded
      this.request.open("GET", "./patterns/TooLittleTooLate.xml")
      this.request.send()
    }
    onPlayerSequenceLoaded = () => {
      let obj = parser.parse(this.request.response)
      let playerSequence:PlayerSequence = PlayerSequence.fromJSON(obj)
      this.setState({playerSequence:playerSequence})
    }
    updateSettings = (newSettings:PlayerSessionSettings) => {
      this.setState({settings:newSettings})
    }
    getStateSettings = () => { return this.state.settings }
    toggleSettingsPanel = () => {
      let newSettings:PlayerSessionSettings = this.state.settings.clone()
      newSettings.isOpen = !newSettings.isOpen
      this.setState({settings:newSettings})
    }
    toggleInstructions = () => {}
    restart = () => {
      this.setState({startTime:Date.now()})
    }
    getPlayerSequence = () => {
      /*
        let patterns:PlayerPattern[] = []
        let positions:Position[] = [new Position(0,2), new Position(1,3), new Position(2,2)]
        let pattern:PlayerPattern = new PlayerPattern("D Major Triad, 2nd Inversion", positions)
        patterns.push(pattern)
        positions = [new Position(0,3), new Position(1,3), new Position(2,4)]
        pattern = new PlayerPattern("G Major Triad, 1st Inversion", positions)
        patterns.push(pattern)
        positions = [new Position(1,2), new Position(2,2), new Position(3,2)]
        pattern = new PlayerPattern("A Major Triad, 2nd Inversion", positions)
        patterns.push(pattern)
        positions = [new Position(0,3), new Position(1,3), new Position(2,4), new Position(3,5)]
        pattern = new PlayerPattern("G Major Triad, Root Position", positions)
        patterns.push(pattern)
        positions = [new Position(1,2), new Position(2,2), new Position(3,2)]
        pattern = new PlayerPattern("A Major Triad, 2nd Inversion", positions)
        patterns.push(pattern)
        positions = [new Position(0,3), new Position(1,3), new Position(2,4), new Position(3,5)]
        pattern = new PlayerPattern("G Major Triad, Root Position", positions)
        patterns.push(pattern)
        positions = [new Position(0,2), new Position(1,3), new Position(2,2)]
        pattern = new PlayerPattern("D Major Triad, 2nd Inversion", positions)
        patterns.push(pattern)
        let p:PlayerSequence = new PlayerSequence(patterns)
        return p
        */
    }
    render(){
      let sessionProps:PlayerSessionProps = new PlayerSessionProps(this.state.settings, this.state.playerSequence)
      return  <>
                <div className="exercise-title-bar">
                  Player:
                </div>
                <svg className="guitarTrainer" width="100%" viewBox="0 0 7400 6000" xmlns="http://www.w3.org/2000/svg">
                  <PlayerSession {...sessionProps}></PlayerSession>
                  <text onClick={this.restart} className="restart">[ restart ]</text>
                </svg>
              </>
    }
}
export default Player