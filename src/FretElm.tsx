import React from "react"

export class FretElmProps{
  fretIndex:number
  isActive:boolean
  onFretClickHandler:Function
  constructor(fretIndex:number, isActive:boolean, onFretClickHandler:Function){
    this.fretIndex = fretIndex
    this.isActive = isActive
    this.onFretClickHandler = onFretClickHandler
  }
}

class FretElm extends React.Component {
  fretIndex:number
  static fretXPositions:number[] = [20,820,1575,2287,2960,3595,4194,4760,5294,5798,6274,6723,7146,7546,7924,8280,8617,8934,9234,9517,9784,10036,10273,10498,10710]
  props!:FretElmProps
  constructor(props:FretElmProps){
    super(props)
    this.fretIndex = props.fretIndex
  }
  onClick = () => {
    this.props.onFretClickHandler(this.props)
  }

  getFretX = () => {
    return FretElm.fretXPositions[this.fretIndex]
  }
  getClass = () => {
    let modifier:string = (this.props.isActive) ? "active" : "inactive"
    return "fret " + modifier
  }

  render(){
    return <rect onClick={this.onClick} className={this.getClass()} x={this.getFretX()}/>
  }

}
export default FretElm
