import React from "react"

class FretElm extends React.Component {
  fretIndex:number
  static fretXPositions:number[] = [20,820,1575,2287,2960,3595,4194,4760,5294,5798,6274,6723,7146,7546,7924,8280,8617,8934,9234,9517,9784,10036,10273,10498,10710]
  props:any
  constructor(props:any){
    super(props)
    this.fretIndex = props.fretIndex
  }

  getFretX = () => {
    return FretElm.fretXPositions[this.fretIndex]
  }

  render(){
    return <rect className="fret" x={this.getFretX()}/>
  }

}
export default FretElm
