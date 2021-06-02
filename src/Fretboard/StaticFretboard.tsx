import React from "react";
import { GuitarSettings } from "../Guitar/GuitarSettings";

export class StaticFretboardProps{
    guitarSettings:GuitarSettings
    children!:JSX.Element[]
    constructor(guitarSettings:GuitarSettings){
        this.guitarSettings = guitarSettings
    }
}
export class StaticFretboard extends React.Component{
    props!:StaticFretboardProps
    constructor(props:StaticFretboardProps){
        super(props)
    }
    render(){
        return <>{this.props.children}</>
    }

}