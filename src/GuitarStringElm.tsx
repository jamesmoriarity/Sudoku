import React from "react"

class GuitarStringElm extends React.Component {
  stringIndex:number

  static getStringY = (stringNumber:number) => {
    return 173 + (167 * stringNumber)
  }

  constructor(props:any){
    super(props)
    this.stringIndex = props.stringIndex
  }

  getY = () => {
    return GuitarStringElm.getStringY(this.stringIndex)
  }

  render(){
    return  <g className="guitar-string">
              <rect y={this.getY()} x="50.0" height="20" width="10800"/>
            </g>
    }

}
export default GuitarStringElm
