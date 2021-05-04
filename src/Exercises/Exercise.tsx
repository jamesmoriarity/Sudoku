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
import SettingsProps from "../SettingsProxy"
import { AnswerIndicator, AnswerIndicatorProps } from "../Controls/AnswerIndicator"
import Controls from "../Controls/Controls"
import StaticFretboard from "../Fretboard/StaticFretboard"
import SettingsEditor, { SettingsEditorProps } from "./Settings/SettingsEditor"
import NoteDot, { NoteDotProps } from "../Fretboard/NoteDot"
import { ExerciseSession, ExerciseSessionProps } from "./ExerciseSession"

export class ExerciseState{
    history:ExerciseHistory
    settings:ExerciseSettings
    startTime:number
    constructor(){
      this.history = new ExerciseHistory()
      this.settings = new ExerciseSettings()
      this.startTime = Date.now()
    }
  }

class Exercise extends React.PureComponent{
    state:ExerciseState
    constructor(props:any){
      super(props)
      this.state = new ExerciseState()
    }
    updateSettings = (newSettings:ExerciseSettings) => {
      this.setState({settings:newSettings})
    }
    getStateSettings = () => { return this.state.settings }
    toggleSettingsPanel = () => {
      let newSettings:ExerciseSettings = this.state.settings.clone()
      newSettings.isOpen = !newSettings.isOpen
      this.setState({settings:newSettings})
    }
    toggleInstructions = () => {}
    restart = () => {
      this.setState({startTime:Date.now()})
    }
    render(){
      let sessionProps:ExerciseSessionProps = new ExerciseSessionProps(this.state.startTime, this.state.settings)
      return  <>
                <div className="exercise-title-bar">
                  Name the Note: <span onClick={this.toggleSettingsPanel}>Settings</span> <span onClick={this.toggleInstructions}>Instructions</span>
                </div>
                <SettingsEditor {...new SettingsEditorProps(this.updateSettings, this.state.settings)}/>
                <svg className="guitarTrainer" width="100%" viewBox="0 0 7400 6000" xmlns="http://www.w3.org/2000/svg">

                  <ExerciseSession {...sessionProps}></ExerciseSession>
                  
                  <text onClick={this.restart} className="restart">[ restart ]</text>
                </svg>
              </>
    }
}
export default Exercise