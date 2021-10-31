import React from 'react'
import { useState, useEffect } from 'react'
import './Api.css'

export default function Api() {
 //FETCH AND STORE DATA

 const [data, setData] = useState('')

 useEffect(() => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
   .then((res) => res.json())
   .then((json) => setData(json))
   .catch((err) => console.log(err))
 }, [])

 //INDEPENDENT COMPONENT FOR MULTIPLE RENDER

 const RenderGraph = (props) => {
  const { object, index } = props
  const { idDrink, strInstructions, strDrink } = object
  const [isActive, setIsActive] = useState(false)

  //HOVER HANDLER

  const overHandler = () => setIsActive(!isActive)

  return (
   <div className="graph-wrapper">
    {isActive && (
     <div className="label">
      {idDrink} / {strDrink}
     </div>
    )}
    <div
     key={index}
     className="graph-column"
     style={{ height: `${parseInt(object.idDrink) / 1000 + 100}px` }}
     onMouseOver={() => overHandler()}
     onMouseLeave={() => overHandler()}
    ></div>
    {isActive && (
     <div className="instructions">`INSTRUCTION: {strInstructions}`</div>
    )}
   </div>
  )
 }

 //MAIN RENDER

 return (
  <div className="api">
   {data && (
    <div className="api-container">
     {data.drinks.map((object, index) => (
      <div key={index}>
       <RenderGraph object={object} index={index} />
      </div>
     ))}
    </div>
   )}
  </div>
 )
}
