import React, { ChangeEvent } from "react"
import { NoteDotProps } from "../../Fretboard/NoteDot"
import Position from "../../Position"
import Music from "../../Utils/Music"
import Settings from "./Settings"

class ExerciseSettings extends Settings{
    answerTimeInSeconds:number = 10
    constructor(){ super() }
    getRandomActivePositionExcept = (currentPosition:Position | null = null) => {
      let activePositions:Position[] = this.getActivePositionExcept(currentPosition)
      let randomIndex = Math.floor( Math.random() * (activePositions.length) )
      let position:Position = activePositions[randomIndex]
      return position
    }
    getActiveMap = (max:number) => {
        let m:Map<number, boolean> = new Map()
        for(let i:number = 0; i < max; i++){  m.set(i, true) }
        return m
    }  
    clone = ():ExerciseSettings => {
      let newCopy:ExerciseSettings = new ExerciseSettings()
      newCopy.activeFrets = new Map(this.activeFrets)
      newCopy.activeStrings = new Map(this.activeStrings)
      newCopy.isOpen = this.isOpen
      return newCopy
    }
}
export default ExerciseSettings