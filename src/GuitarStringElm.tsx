import React from "react"

class GuitarStringElm extends React.Component {
  stringIndex:number

  constructor(props:any){
    super(props)
    this.stringIndex = props.stringIndex
  }

  getStringY = () => {
    return 173 + (167 * this.stringIndex)
  }

  render(){
    return  <g className="guitar-string">
              <rect y={this.getStringY()} x="50.0" height="20" width="10800"/>
            </g>
    }

}
export default GuitarStringElm
