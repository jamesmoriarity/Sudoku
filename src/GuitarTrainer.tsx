import React from "react"
import {Exercise} from "./Exercise"

class GuitarTrainer extends React.Component {
 	constructor(props:any){
 		super(props)
 	}
  render(){
    return  <svg xmlns="http://www.w3.org/2000/svg" height="300px" width="1150px" viewBox="0 0 11500 3000" className="fretboard-super">
              <Exercise />
            </svg>
  }
}
export default GuitarTrainer
