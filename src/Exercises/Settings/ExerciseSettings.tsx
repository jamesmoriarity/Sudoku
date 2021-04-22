import React, { ChangeEvent } from "react"
import { NoteDotProps } from "../../Fretboard/NoteDot"
import Position from "../../Position"
import Music from "../../Utils/Music"

class ExerciseSettings{
    activeFrets:Map<number, boolean>
    activeStrings:Map<number, boolean>
    isOpen:boolean = false
    answerTimeInSeconds:number = 10
    instructionsDisplay:boolean = false
    notes:string[]
    constructor(){
        this.activeFrets = this.getActiveMap(13)
        this.activeStrings = this.getActiveMap(6)
        this.notes = Music.sharpNoteNames
    }
    getActiveMap = (max:number) => {
        let m:Map<number, boolean> = new Map()
        for(let i:number = 0; i < max; i++){ 
          m.set(i, true)
        }
        return m
    } 
    getAllActivePositions = () => {
        // loop through all active frets and strings
        let activeFrets:number[] = []
        this.activeFrets.forEach((isActive:boolean, fretIndex:number) => {
          if(isActive){ activeFrets.push(fretIndex) }
        })
        let activeStrings:number[] = []
        this.activeStrings.forEach((isActive:boolean, stringIndex:number) => {
          if(isActive){ activeStrings.push(stringIndex) }
        })
        let postions:Position[] = []
        activeFrets.forEach((f:number) =>{
          activeStrings.forEach((s:number) => {
            postions.push(new Position(f,s))
          })
        })
        return postions
    
      }   
}
export default ExerciseSettings