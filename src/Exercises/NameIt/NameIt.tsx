import React from "react";

import BaseExercise from "../Base/BaseExercise";
import { NameItSession, NameItSessionProps } from "./NameItSession";

export class NameIt extends BaseExercise{
    toggleSettingsPanel = () => {}
    toggleInstructions = () => {}
    restart = () => {}
    render(){
        return <>
                <div className="exercise-title-bar">
                  Name the Note: <span onClick={this.toggleSettingsPanel}>Settings</span> <span onClick={this.toggleInstructions}>Instructions</span>
                </div>
                <NameItSession {...new NameItSessionProps()}></NameItSession>
              </>
    }
}
export default NameIt