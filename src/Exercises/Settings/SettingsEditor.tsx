import React, { ChangeEvent } from "react"
import GuitarTrainerSettings from "../../GuitarTrainerSettings"
import SettingsProps from "../../SettingsProps"
import Guitar from "../../Utils/Guitar"
import ExerciseSettings from "./ExerciseSettings"

export class SettingsEditorState{
  isOpen:boolean
  constructor(){
    this.isOpen = false
  }
}

class SettingsEditor extends React.Component{
    props!:SettingsProps
    settings:ExerciseSettings
    isOpen:boolean
    constructor(props:SettingsProps){
        super(props)
        this.settings = props.get()
        this.isOpen = false
    }
    getStringOptions = () => {
        let options:JSX.Element[] = []
        for (let [index, value] of this.settings.activeStrings.entries()) {
          let noteName = GuitarTrainerSettings.guitar.stringNames[index]
          let elm = <div className="exercise-settings-string-chk-container" key={"string-chk" + index}><input type="checkbox" checked={value} onChange={()=>this.onStringToggle(index)}/>{noteName}</div>
          options.push(elm)
        }
        return options
    }
      getFretOptions = () => {
        let options:JSX.Element[] = []
        for (let [index, value] of this.settings.activeFrets.entries()) {
          let noteName = GuitarTrainerSettings.guitar.stringNames[index]
          let elm = <div className="exercise-settings-fret-chk-container" key={"fret-chk" + index}><input type="checkbox" checked={value} onChange={()=>this.onFretToggle(index)}/>{(index == 0) ? "Open" : index}</div>
          options.push(elm)
        }
        return options
    }

    onStringToggle = (stringNum:number) => {
      let activeStrings = new Map(this.settings.activeStrings)
      let activeStringVal:boolean | undefined = activeStrings.get(stringNum)
      if (activeStringVal != undefined)
        activeStrings.set(stringNum, !activeStringVal)
        this.setState({activeStrings:activeStrings})
    }
    onFretToggle = (fretNum:number) => {
      let activeFrets = new Map(this.settings.activeFrets)
      let activeFretVal:boolean | undefined = activeFrets.get(fretNum)
      if(activeFretVal != undefined)
        activeFrets.set(fretNum, !activeFretVal)
        this.setState({activeFrets:activeFrets})
    } 
    onToggleIsOpen = () => {
      this.setState({isOpen:!this.isOpen})
    }
    onTimeChange = (e:ChangeEvent<HTMLInputElement>) => {
      let n:number = Number(e.currentTarget.value) as number
      this.setState({answerTimeInSeconds:n})
    }
    render(){
        return  <div id="exercise-settings">
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
                        <input onChange={this.onTimeChange} value={this.settings.answerTimeInSeconds} type="number" id="name" name="name" required={true} min={2} max={60} size={2}/>
                    </div>
                    <div id="close-button"><button type="button" onClick={this.onToggleIsOpen}>Close</button></div>
                    </div>
                </div>
    }
}
export default SettingsEditor