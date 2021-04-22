import React from "react"

class DoubleDotElm extends React.Component {
  cx:number
  static cxPositions: number[] = [6964, 10634]

  constructor(props:any){
    super(props)
    this.cx = DoubleDotElm.cxPositions[props.dotIndex]
  }

  render(){
    return  <>
              <circle className="doubledot top" cx={this.cx} r="65"/>
              <circle className="doubledot bottom" cx={this.cx} r="65"/>
            </>
    }

}
export default DoubleDotElm
