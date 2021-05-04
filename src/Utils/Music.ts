class Music{
    static NoteNameFormatSharp:string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    static NoteNameFormatFlat:string[] = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
    static NoteNamesSelected:string[] = Music.NoteNameFormatSharp
    static getNoteHalfStepsFrom(rootNote:string, halfsteps:number){
        let rootNoteIndex:number = Music.NoteNamesSelected.indexOf(rootNote)
        let selectedNoteIndex:number = (rootNoteIndex + halfsteps) % 12
        return Music.NoteNamesSelected[selectedNoteIndex]
    }
}
export default Music