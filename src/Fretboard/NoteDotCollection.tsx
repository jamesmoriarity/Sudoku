import React from "react"
import {NoteDot, NoteDotProps} from "./NoteDot"

export class NoteDotCollectionProps{
  noteDotsProps:NoteDotProps[]
  constructor(noteDotsProps:NoteDotProps[] = []){
    this.noteDotsProps = noteDotsProps
  }
}

export class NoteDotCollection extends React.Component {
  props!:NoteDotCollectionProps
 	constructor(props:NoteDotCollectionProps){
 		super(props)
 	}
  getNoteDotComps = () => {
    let dotComps = []
    for(let i:number = 0; i < this.props.noteDotsProps.length; i++){
      let e = <NoteDot {...this.props.noteDotsProps[i]} key={"noteDot" + i}/>
      dotComps.push( e )
    }
    return dotComps
  }
  render(){
    return <g className="noteDotCollection">
            {this.getNoteDotComps()}
          </g>
  }
}
export default NoteDotCollection
