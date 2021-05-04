import Exercise from "./Exercises/Exercise"
import Player from "./Player/Player"

export class ExerciseComponents{

  static getAllComponents():Map<string, Function>{
      let map:Map<string, Function> = new Map()
      map.set("Player", Player)
      map.set("Exercise", Exercise)
      return map
  }
  static getNames():string[]{
    return [...ExerciseComponents.getAllComponents().keys()]
  }
  static getValues():Function[]{
    return [...ExerciseComponents.getAllComponents().values()]
  }
}

export default ExerciseComponents

