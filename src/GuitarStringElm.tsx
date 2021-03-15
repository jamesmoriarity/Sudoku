import React from "react"
import Config from "./GuitarTrainerSettings"

export class GuitarStringElmProps{
  static stepY:number = Config.displayConfig.guitarStrings.stepY

  stringIndex:number
  constructor(index:number){
    this.stringIndex = index
  }
}


export class GuitarStringElm extends React.Component {
  stringIndex:number
  y:number

  static getStringY = (stringNumber:number) => {
    return GuitarStringElmProps.stepY * (stringNumber + 1)
  }

  getProps = () => {
    return this.props as GuitarStringElmProps
  }

  constructor(props:GuitarStringElmProps){
    super(props)
    this.stringIndex = props.stringIndex
    this.y = GuitarStringElm.getStringY(this.stringIndex)
  }

  render(){
    return  <rect className="guitar-string" y={this.y}/>
    }

}
export default GuitarStringElm
