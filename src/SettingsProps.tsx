import ExerciseSettings from "./Exercises/Settings/ExerciseSettings"

class SettingsProps{
    getter:Function
    constructor(getter:Function){
        this.getter = getter
    }
    get = ():ExerciseSettings => {
        return this.getter()
    }
}
export default SettingsProps