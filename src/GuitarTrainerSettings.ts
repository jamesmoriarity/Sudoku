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
  static QuestionTime:number = 6
  static music:any = {
    noteNames:["C", "C# Db", "D", "D# Eb", "E", "F", "F# Gb", "G", "G# Ab", "A", "A# Bb", "B"]
  }
  static guitar:any = {
    stringNames:["E", "B", "G", "D", "A", "E"],
    getNoteNameForPosition:(stringIndex:number, fretIndex:number) => {
      let stringRootNote:string = GuitarTrainerSettings.guitar.stringNames[stringIndex]
      let stringRootNoteIndex:number = GuitarTrainerSettings.music.noteNames.indexOf(stringRootNote)
      let selectedNoteIndex:number = (stringRootNoteIndex + fretIndex) % 12
      return GuitarTrainerSettings.music.noteNames[selectedNoteIndex]
    }
  }
}
