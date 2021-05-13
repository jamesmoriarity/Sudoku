import React from "react"
import Config from "../GuitarTrainerSettings"

export class GuitarStringElmProps{
  static stepY:number = Config.displayConfig.guitarStrings.stepY

  stringIndex:number
  isActive:boolean
  constructor(index:number, isActive:boolean){
    this.stringIndex = index
    this.isActive = isActive
  }
}

export class GuitarStringElm extends React.Component {
  stringIndex:number
  y:number
  props!:GuitarStringElmProps

  constructor(props:GuitarStringElmProps){
    super(props)
    this.stringIndex = props.stringIndex
    this.y = GuitarStringElm.getStringY(this.stringIndex)
  }

  static getStringY = (stringNumber:number) => {
    return GuitarStringElmProps.stepY * (stringNumber + 1)
  }

  getClass = () => {
    let modifier:string = (this.props.isActive) ? "active" : "inactive"
    return "guitar-string " + modifier
  }

  render(){
    return  <rect className={this.getClass()} y={this.y}/>
    }

}
export default GuitarStringElm
