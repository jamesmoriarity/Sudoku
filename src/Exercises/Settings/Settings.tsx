import React, { ChangeEvent } from "react"
import { NoteDotProps } from "../../Fretboard/NoteDot"
import Position from "../../Position"
import Music from "../../Utils/Music"

class Settings{
    activeFrets:Map<number, boolean>
    activeStrings:Map<number, boolean>
    isOpen:boolean
    instructionsDisplay:boolean = false
    constructor(){
        this.activeFrets = this.getActiveMap(13)
        this.activeStrings = this.getActiveMap(6)
        this.isOpen = false
    }
    clone = ():Settings => {
      let newCopy:Settings = new Settings()
      newCopy.activeFrets = new Map(this.activeFrets)
      newCopy.activeStrings = new Map(this.activeStrings)
      newCopy.isOpen = this.isOpen
      return newCopy
    }
    toggleIsOpen = () => {
      this.isOpen = !this.isOpen
    }
    getRandomActivePositionExcept = (currentPosition:Position | null = null) => {
      let activePositions:Position[] = this.getActivePositionExcept(currentPosition)
      let randomIndex = Math.floor( Math.random() * (activePositions.length) )
      let position:Position = activePositions[randomIndex]
      return position
    }
    getActiveMap = (max:number) => {
        let m:Map<number, boolean> = new Map()
        for(let i:number = 0; i < max; i++){ 
          m.set(i, true)
        }
        return m
    } 
    getActivePositionExcept = (currentPosition:Position | null = null) => {
        // loop through all active frets and strings
        let activeFrets:number[] = []
        this.activeFrets.forEach((isActive:boolean, fretIndex:number) => {
          if(isActive){ activeFrets.push(fretIndex) }
        })
        let activeStrings:number[] = []
        this.activeStrings.forEach((isActive:boolean, stringIndex:number) => {
          if(isActive){ activeStrings.push(stringIndex) }
        })
        let activePositions:Position[] = []
        activeFrets.forEach((f:number) =>{
          activeStrings.forEach((s:number) => {
            let newPosition:Position = new Position(s,f)
            if(currentPosition == null || !newPosition.equals(currentPosition))
              activePositions.push(newPosition)
          })
        })
        return activePositions
    
      }   
}
export default Settings