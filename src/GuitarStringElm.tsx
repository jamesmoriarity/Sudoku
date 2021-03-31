import React from "react"
import Config from "./GuitarTrainerSettings"

export class GuitarStringElmProps{
  static stepY:number = Config.displayConfig.guitarStrings.stepY

  stringIndex:number
  isActive:boolean
  onClickHander:Function
  constructor(index:number, isActive:boolean, onClickHander:Function){
    this.stringIndex = index
    this.isActive = isActive
    this.onClickHander = onClickHander
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
  onClick = () => this.props.onClickHander(this.props)

  render(){
    return  <rect onClick={this.onClick} className={this.getClass()} y={this.y}/>
    }

}
export default GuitarStringElm
