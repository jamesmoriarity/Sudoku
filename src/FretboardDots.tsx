import React from "react"
import DotElm from "./DotElm"
import DoubleDotElm from "./DoubleDotElm"


class FretboardDots extends React.Component {
 	constructor(props:any){
 		super(props)
 	}
  getDots = () => {
    let dots = []
    for(let i:number = 0; i < 4; i++){
      let e = <DotElm {...{dotIndex:i}}  key={"dot" + i}/>
      dots.push( e )
    }
    for(let i:number = 0; i < 1; i++){
      let e = <DoubleDotElm {...{dotIndex:i}} key={"doubledot" + i}/>
      dots.push( e )
    }
    return dots
  }
  render(){
    return  <g className="fretboardDots">
              {this.getDots()}
            </g>
  }
}
export default FretboardDots
