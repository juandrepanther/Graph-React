import { useState } from 'react'
import './App.css'

const btns = [
 'C',
 '+/-',
 '%',
 '/',
 7,
 8,
 9,
 '*',
 4,
 5,
 6,
 '-',
 1,
 2,
 3,
 '+',
 0,
 '.',
 'D',
 '=',
]

function App() {
 const [state, setState] = useState({
  firstNum: '',
  nextNum: '',
  result: '',
  progress: '',
  operator: '',
 })
 const [isFirstEntry, setIsFirstEntry] = useState(true)

 const operate = (firstNum, nextNum, operator) => {
  console.log(operator)
  return eval(
   `${firstNum.toString()} ${operator.toString()} ${nextNum.toString()}`
  )
 }

 const RenderBtns = () => {
  return btns.map((btn, index) => (
   <div key={index} onClick={btnHandler} className="calculator-btn">
    {btn}
   </div>
  ))
 }

 const btnHandler = (e) => {
  const value = e.target.innerHTML
  const isNumber = !isNaN(value)

  if (isFirstEntry && isNumber) {
   setState({ ...state, firstNum: state.firstNum + value })
  } else if (!isFirstEntry && isNumber) {
   setState({ ...state, nextNum: state.nextNum + value })
  }

  //if I put operator, then
  if (!isNumber) {
   //result is empty, then...
   if (!state.result) {
    setState({
     ...state,
     operator: value,
     result: operate(state.firstNum, state.nextNum, state.operator),
     //  nextNum: '',
     //  firstNum: '',
    })
    setIsFirstEntry(!isFirstEntry)

    //if result already exists, then...
   } else {
    setState({
     ...state,
     operator: value,
     result: operate(
      state.result,
      state.firstNum || state.nextNum,
      state.operator
     ),
     nextNum: '',
     firstNum: '',
    })
    console.log('Clear nextNum')
    setIsFirstEntry(!isFirstEntry)
   }
  }
 }

 console.log(state, isFirstEntry)
 return (
  <div className="container">
   <div className="calculator">
    <div className="calculator-theme"></div>
    <div className="calculator-display">
     <div className="result">{state.result}</div>
     <div className="progress">{state.progress}</div>
    </div>
    <div className="calculator-btn-wrapper">
     <RenderBtns />
    </div>
   </div>
  </div>
 )
}

export default App
