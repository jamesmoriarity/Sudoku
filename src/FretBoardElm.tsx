import React from "react"

class FretBoardElm extends React.Component {
  constructor(props:any){
    super(props)
  }
  render(){
    return  <g className="fretboard">
              <rect y="100" x="50.0" height="1000.0" width="10800"/>
            </g>
  }
  sayHello = () => {
    return 'aloha'
  }
}
export default FretBoardElm
