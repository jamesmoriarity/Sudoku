import React from "react"

class FretBoardUtils {
  static noteNames:string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  static stringNames:string[] = ["E", "A", "D", "G", "B", "E"]
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
  state:any
 	constructor(props:any){
 		super(props)
    this.state = {}
    this.state.name = props.name
    this.guitarStrings = this.buildGuitarStrings()
 	}
  onClick = () => {
    console.log("onClick")
    let newName = "Mr." +this.state.name
    this.setState({name:newName})
  }
  render(){
    return  <svg xmlns="http://www.w3.org/2000/svg" height="300px" width="1150px" viewBox="0 0 11500 3000" className="fretboard-super">
      <linearGradient id="stringPattern">
        <stop offset="5%" stopColor="#222"/>
        <stop offset="50%" stopColor="#666"/>
        <stop offset="95%" stopColor="#222"/>
      </linearGradient>

      <g className="fretboard">
        <rect y="100" x="50.0" height="1000.0" width="10800"/>
      </g>

      <g className="dot">
        <circle cy="600.0" cx="1961.45893740149" r="65"/>
      </g>
      <g className="dot">
        <circle cy="600.0" cx="3308.01576725424" r="65"/>
      </g>
      <g className="dot">
        <circle cy="600.0" cx="4507.66152087317" r="65"/>
      </g>
      <g className="dot">
        <circle cy="600.0" cx="5576.42438499478" r="65"/>
      </g>
      <g className="dot">
        <circle cy="350.0" cx="6964.96887917045" r="65"/>
        <circle cy="850.0" cx="6964.96887917045" r="65"/>
      </g>
      <g className="dot">
        <circle cy="600.0" cx="9405.69225847889" r="65"/>
      </g>
      <g className="dot">
        <circle cy="600.0" cx="8132.59096674305" r="65"/>
      </g>
      <g className="dot">
        <circle cy="600.0" cx="8805.86938166942" r="65"/>
      </g>
      <g className="dot">
        <circle cy="600.0" cx="9940.0736905397" r="65"/>
      </g>
      <g className="dot">
        <circle cy="350.0" cx="10634.3459376275" r="65"/>
        <circle cy="850.0" cx="10634.3459376275" r="65"/>
      </g>

    <g className="fret">
      <rect y="100" x="20.0" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="820.0" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="1575.09945014535" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="2287.81842465763" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="2960.5355568606" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="3595.49597764788" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="4194.81880839855" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="4760.50423334779" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="5294.4401750158" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="5798.40859497375" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="6274.09144097484" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="6723.07626029859" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="7146.86149804231" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="7546.86149804231" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="7924.41122311498" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="8280.77071037112" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="8617.12927647261" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="8934.60948686625" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="9234.27090224158" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="9517.1136147162" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="9784.08158555021" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="10036.0657955292" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="10273.9072185297" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="10498.3996281916" height="1000.0" width="60"/>
    </g>
    <g className="fret">
      <rect y="100" x="10710.2922470635" height="1000.0" width="60"/>
    </g>
    <g className="guitar-string">
      <rect y="173.333333333333" x="50.0" height="20" width="10800"/>
    </g>
    <g className="guitar-string">
      <rect y="340.0" x="50.0" height="20" width="10800"/>
    </g>
    <g className="guitar-string">
      <rect y="506.666666666667" x="50.0" height="20" width="10800"/>
    </g>
    <g className="guitar-string">
      <rect y="673.333333333333" x="50.0" height="20" width="10800"/>
    </g>
    <g className="guitar-string">
      <rect y="840.0" x="50.0" height="20" width="10800"/>
    </g>
    <g className="guitar-string">
      <rect y="1006.66666666667" x="50.0" height="20" width="10800"/>
    </g>
    </svg>

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
