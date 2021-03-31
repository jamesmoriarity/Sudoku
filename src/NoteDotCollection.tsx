import React from "react"
import {NoteDot, NoteDotProps} from "./NoteDot"

export class NoteDotCollectionProps{
  noteDotsProps:NoteDotProps[]
  constructor(noteDotsProps:NoteDotProps[] = []){
    this.noteDotsProps = noteDotsProps
  }
}

export class NoteDotCollection extends React.Component {
 	constructor(props:NoteDotCollectionProps){
 		super(props)
 	}
  getProps = () => {
    return this.props as NoteDotCollectionProps
  }
  getNoteDotComps = () => {
    let dotComps = []
    for(let i:number = 0; i < this.getProps().noteDotsProps.length; i++){
      let e = <NoteDot {...this.getProps().noteDotsProps[i]} key={"noteDot" + i}/>
      dotComps.push( e )
    }
    return dotComps
  }
  render(){
    console.log('render noteDotCollection')
    return <g className="noteDotCollection">
            {this.getNoteDotComps()}
          </g>
  }
}
export default NoteDotCollection
