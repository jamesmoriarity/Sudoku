import React from "react"

class FretBoardUtils {
  static noteNames:string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  static stringNames:string[] = ["E", "A", "D", "G", "D", "B"]
  static numberOfFrets:number = 14
}

class Note {
  noteName:string
  noteIndex:number
  constructor(noteName:string){
    this.noteName = noteName
    this.noteIndex = FretBoardUtils.noteNames.indexOf(noteName)
  }
  static getIntervalNote(baseNoteName:string, interval:number){
    let index:number = FretBoardUtils.noteNames.indexOf(baseNoteName)
    let intervalIndex = (index + interval) % 12
    return new Note(FretBoardUtils.noteNames[intervalIndex])
  }
}

class Fret {
  stringName:string
  fretIndex:number
  note:Note
  constructor(stringName:string, fretIndex:number){
    this.stringName = stringName
    this.fretIndex = fretIndex
    this.note = Note.getIntervalNote(stringName, fretIndex)
  }
}

class GuitarString {
  frets:Fret[] = []
  stringName:string
  constructor(noteName:string){
    this.stringName = noteName
    this.frets = this.buildFrets()
  }
  buildFrets = () => {
    let frets:Fret[] = []
    for(let i = 0; i <= FretBoardUtils.numberOfFrets; i++){
      let fret:Fret = new Fret(this.stringName, i)
      frets.push(fret)
    }
    return frets
  }
}

class GuitarTrainer extends React.Component {
  guitarStrings:GuitarString[]
 	constructor(props:any){
 		super(props)
    this.guitarStrings = this.buildGuitarStrings()
 	}
  render (){
    return <h1>GuitarTrainer</h1>
  }

  buildGuitarStrings = () => {
    let strings:GuitarString[] = []
    FretBoardUtils.stringNames.forEach( (guitarNoteName:string, index:number) => {
      let guitarString:GuitarString = new GuitarString(guitarNoteName)
      strings.push(guitarString)
    })
    return strings
  }
}



export default GuitarTrainer
