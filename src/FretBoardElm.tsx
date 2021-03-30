import React from "react"

class FretboardElm extends React.Component {
  constructor(props:any){
    super(props)
  }
  render(){
    return  <rect className="fretboard"/>
  }
  sayHello = () => {
    return 'aloha'
  }
}
export default FretboardElm
