import React from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"
import DotElm from "./DotElm"
import DoubleDotElm from "./DoubleDotElm"
import FretBoardElm from "./FretBoardElm"
import {NoteDot, NoteDotProps} from "./NoteDot"

class GuitarTrainerState{
  cycles:number
  noteDots:NoteDotProps[]
  constructor(noteDotsProps:NoteDotProps[], cycles:number){
    this.cycles = cycles
    this.noteDots = noteDotsProps
  }
}

class GuitarTrainer extends React.Component {
  fretBoardBaseElements:any
  fbRef:any
  state:any
 	constructor(props:any){
 		super(props)
    this.state = new GuitarTrainerState([], 0)
    this.fbRef = React.createRef()
    this.fretBoardBaseElements = this.getfretBoardBaseElements()
 	}

  getfretBoardBaseElements = () => {
    let elms:any = {}
    elms.fretboard = <FretBoardElm ref={this.fbRef}/>
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
    return elms
  }

  getNoteDotComps = (onClickHandler:Function) => {
    let dotComps = []
    for(let i:number = 0; i < this.state.noteDots.length; i++){

// notedot props onClick

      let e = <NoteDot {...this.state.noteDots[i]} key={"noteDot" + i + this.state.cycles}/>
      dotComps.push( e )
    }
    return dotComps
  }

  onClicked = (event:React.MouseEvent) => {
    let s = Math.floor(Math.random() * 6)
    let f = Math.floor(Math.random() * 6) + 1
    let noteDotProps:NoteDotProps = new NoteDotProps(f, s)
    let noteDotPropsArray: NoteDotProps[] = [noteDotProps]

    let newCycles = this.state.cycles + 1
    this.setState(new GuitarTrainerState(noteDotPropsArray, newCycles))
  }

  render(){
    return  <svg onClick={this.onClicked} xmlns="http://www.w3.org/2000/svg" height="300px" width="1150px" viewBox="0 0 11500 3000" className="fretboard-super">
      <linearGradient id="stringPattern">
        <stop offset="5%" stopColor="#222"/>
        <stop offset="50%" stopColor="#666"/>
        <stop offset="95%" stopColor="#222"/>
      </linearGradient>
      {this.fretBoardBaseElements.fretboard}
      {this.fretBoardBaseElements.dots}
      {this.fretBoardBaseElements.doubleDots}
      {this.fretBoardBaseElements.frets}
      {this.fretBoardBaseElements.guitarStrings}
      {this.getNoteDotComps(this.onClicked)}
    </svg>
  }

}
export default GuitarTrainer
