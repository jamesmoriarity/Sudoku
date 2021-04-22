import Exercise from "./Exercise"

export class ExerciseComponents{
  static components:Map<string, any> | undefined = undefined
  static getComponents(){
    if(!ExerciseComponents.components){
      let map:Map<string, any> = new Map()
      map.set("Exercise", Exercise)
      ExerciseComponents.components = map
    }
    return ExerciseComponents.components
  }
  static getNames():string[]{
    return [...ExerciseComponents.getComponents().keys()]
  }
}

export default ExerciseComponents
