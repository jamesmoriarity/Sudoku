import React from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"


export class NoteDotProps {
  cx:number
  cy:number
  radius:number
  onClick:(event:React.MouseEvent<SVGGElement, MouseEvent>)=>void
  constructor(fNum:number, sNum:number, radius:number, onClickHandler:(event:React.MouseEvent<SVGGElement, MouseEvent>)=>void){
    this.radius = radius
    this.cx = FretElm.fretXPositions[fNum] // are there other ways to position it?
    this.cy = GuitarStringElm.getStringY(sNum)
    this.onClick = onClickHandler
  }
}

export class NoteDot extends React.Component {
  constructor(props:NoteDotProps){
    super(props)
  }
  getProps = () => { return this.props as NoteDotProps}
  render(){
    let props = this.getProps()
    return  <circle className="noteDot" onClick={props.onClick} cy={props.cy} cx={props.cx}/>

    }

}
export default NoteDot
