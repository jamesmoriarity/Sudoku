export default class GuitarTrainerSettings{
  static displayConfig:any = {
    dotRadius:65,
    guitarStrings:{
      stepY:170,
      x:50,
      height:20,
      width:10800,
      activeStrings:[0,1,2,3,4,5]
    }
  }
  static QuestionTimeInSeconds:number = 6
  static music:any = {
    sharpNoteNames:["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    flatNoteName:["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
    colors: ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff00", "#00ff80", 
              "#00ffff", "#0080ff", "#8282ea", "#8000ff", "#ff00ff", "#ff0080"],
    getColorForNote:(note:string)=>{
      let index:number = GuitarTrainerSettings.music.sharpNoteNames.indexOf(note)
      return GuitarTrainerSettings.music.colors[index]
    }
  }
  static guitar:any = {
    stringNames:["E", "B", "G", "D", "A", "E"],
    getNoteNameForPosition:(fretIndex:number, stringIndex:number) => {
      let stringRootNote:string = GuitarTrainerSettings.guitar.stringNames[stringIndex]
      let stringRootNoteIndex:number = GuitarTrainerSettings.music.sharpNoteNames.indexOf(stringRootNote)
      let selectedNoteIndex:number = (stringRootNoteIndex + fretIndex) % 12
      return GuitarTrainerSettings.music.sharpNoteNames[selectedNoteIndex]
    }
  }
}
