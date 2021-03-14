import React from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"
import DotElm from "./DotElm"
import DoubleDotElm from "./DoubleDotElm"
import FretBoardElm from "./FretBoardElm"

class GuitarTrainer extends React.Component {
  elms:any
 	constructor(props:any){
 		super(props)
    this.initRenderElements()
 	}

  initRenderElements = () => {
    let elms:any = {}
    elms.fretboard = <FretBoardElm/>
    elms.frets = []
    for(let i:number = 0; i < 24; i++){
      let e = <FretElm {...{fretIndex:i}} key={"fret" + i}/>
      elms.frets.push( e )
    }
    elms.guitarStrings = []
    for(let i:number = 0; i < 6; i++){
      let e = <GuitarStringElm {...{stringIndex:i}} key={"string" + i}/>
      elms.guitarStrings.push( e )
    }
    elms.dots = []
    for(let i:number = 0; i < 8; i++){
      let e = <DotElm {...{dotIndex:i}}  key={"dot" + i}/>
      elms.dots.push( e )
    }
    elms.doubleDots = []
    for(let i:number = 0; i < 2; i++){
      let e = <DoubleDotElm {...{dotIndex:i}} key={"doubledot" + i}/>
      elms.doubleDots.push( e )
    }
    this.elms = elms
  }

  onClicked = (event:React.MouseEvent) => {
    let e:FretElm = this.elms.frets[0] as FretElm
    console.log(e)
  }

  render(){
    return  <svg onClick={this.onClicked} xmlns="http://www.w3.org/2000/svg" height="300px" width="1150px" viewBox="0 0 11500 3000" className="fretboard-super">
      <linearGradient id="stringPattern">
        <stop offset="5%" stopColor="#222"/>
        <stop offset="50%" stopColor="#666"/>
        <stop offset="95%" stopColor="#222"/>
      </linearGradient>
      {this.elms.fretboard}
      {this.elms.dots}
      {this.elms.doubleDots}
      {this.elms.frets}
      {this.elms.guitarStrings}
    </svg>
  }

}
export default GuitarTrainer
