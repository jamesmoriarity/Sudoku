import React, { ChangeEvent } from "react"
import { NoteDotProps } from "../../Fretboard/NoteDot"
import GuitarTrainerSettings from "../../GuitarTrainerSettings"
import SettingsProxy from "../../SettingsProxy"
import SettingsProps from "../../SettingsProxy"
import Guitar from "../../Utils/Guitar"
import ExerciseSettings from "./ExerciseSettings"
import { gsap } from "gsap"

export class SettingsEditorProps{
  updateCallBack:Function
  settings:ExerciseSettings
  constructor(updateCallBack:Function, settings:ExerciseSettings){
    this.updateCallBack = updateCallBack
    this.settings = settings
  }
}

class SettingsEditor extends React.Component{
    props!:SettingsEditorProps
    isOpen:boolean
    domRef:HTMLDivElement | null
    constructor(props:SettingsEditorProps){
        super(props)
        this.isOpen = false
        this.domRef = null
    }
    setDomRef = (e:HTMLDivElement):void => {
      this.domRef = e
    }
    getSettings = ():ExerciseSettings => {
      return this.props.settings
    }
    getStringOptions = () => {
        let options:JSX.Element[] = []
        for (let [index, value] of this.getSettings().activeStrings.entries()) {
          let noteName = GuitarTrainerSettings.guitar.stringNames[index]
          let elm = <div className="exercise-settings-string-chk-container" key={"string-chk" + index}><input type="checkbox" checked={value} onChange={()=>this.onStringToggle(index)}/>{noteName}</div>
          options.push(elm)
        }
        return options
    }
      getFretOptions = () => {
        let options:JSX.Element[] = []
        for (let [index, value] of this.getSettings().activeFrets.entries()) {
          let noteName = GuitarTrainerSettings.guitar.stringNames[index]
          let elm = <div className="exercise-settings-fret-chk-container" key={"fret-chk" + index}><input type="checkbox" checked={value} onChange={()=>this.onFretToggle(index)}/>{(index == 0) ? "Open" : index}</div>
          options.push(elm)
        }
        return options
    }

    onStringToggle = (stringNum:number) => {
      console.log("stringNumber=" + stringNum)
      let activeStrings = new Map(this.getSettings().activeStrings)
      let activeStringVal:boolean | undefined = activeStrings.get(stringNum)
      if (activeStringVal != undefined)
        activeStrings.set(stringNum, !activeStringVal)
        let newSettings:ExerciseSettings = this.props.settings.clone()
        newSettings.activeStrings = activeStrings
        this.props.updateCallBack(newSettings)
    }
    onFretToggle = (fretNum:number) => {
      let activeFrets = new Map(this.getSettings().activeFrets)
      let activeFretVal:boolean | undefined = activeFrets.get(fretNum)
      if(activeFretVal != undefined)
        activeFrets.set(fretNum, !activeFretVal)
        let newSettings:ExerciseSettings = this.props.settings.clone()
        newSettings.activeFrets = activeFrets
        this.props.updateCallBack(newSettings)
    } 
    onTimeChange = (e:ChangeEvent<HTMLInputElement>) => {
      let n:number = Number(e.currentTarget.value) as number
      let newSettings:ExerciseSettings = this.props.settings.clone()
      newSettings.answerTimeInSeconds = n
      this.props.updateCallBack(newSettings)
    }
    componentDidMount = () => {
      if(this.getSettings().isOpen){
        this.open()
      }
      this.close()
    }
    componentDidUpdate = () => {
      if(this.getSettings().isOpen){
        this.open()
        return
      }
      this.close()
      
    }
    open = () => {
      console.log("open called!!!")
      let tl:TimelineLite = gsap.timeline({paused:true})
      let open:TweenLite = gsap.to(this.domRef, {height: 318, opacity:1, duration:.3 }) 
      tl.add(open)
      tl.play()
    }
    close = () => {
      console.log("close called!!!")
      let tl:TimelineLite = gsap.timeline({paused:true})
      let close:TweenLite = gsap.to(this.domRef, {height: 0, opacity:0, duration:.3 }) 
      tl.add(close)
      tl.play()
    }
    onToggleIsOpen = () => {
      let newSettings:ExerciseSettings = this.props.settings.clone()
      newSettings.isOpen = !newSettings.isOpen
      this.props.updateCallBack(newSettings)
    }
    render(){
        return  <div id="exercise-settings" ref={this.setDomRef}>
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
                        <input onChange={this.onTimeChange} value={this.getSettings().answerTimeInSeconds} type="number" id="name" name="name" required={true} min={2} max={60} size={2}/>
                    </div>
                    <div id="close-button"><button type="button" onClick={this.onToggleIsOpen}>Close</button></div>
                    </div>
                </div>
    }
}
export default SettingsEditor