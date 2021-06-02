import React from "react";
import { GuitarSettings } from "../../Guitar/GuitarSettings";

import BaseExercise from "../Base/BaseExercise";
import { NameItSession, NameItSessionProps } from "./NameItSession";

export class NameIt extends BaseExercise{
    toggleSettingsPanel = () => {}
    toggleInstructions = () => {}
    restart = () => {}
    props!:GuitarSettings
    constructor(props:GuitarSettings){
        super(props)
    }
    render(){
        return <>
                <div className="exercise-title-bar">
                  Name the Note: <span onClick={this.toggleSettingsPanel}>Settings</span> <span onClick={this.toggleInstructions}>Instructions</span>
                </div>
                <NameItSession {...new NameItSessionProps(this.props)}></NameItSession>
              </>
    }
}
export default NameIt