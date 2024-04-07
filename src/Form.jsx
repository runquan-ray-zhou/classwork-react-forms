import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [operator, setOperator] = useState("")
  const [number, setNumber] = useState("")
  const [result, setResult] = useState(
    {
      number: "",
      operation: "",
      answer:null, 
    }
    )

  function getNumbers(event) {
    setNumber(event.target.value)
  }

  function getOption(event) {
    setOperator(event.target.value)
  }
  
  
  function getAnswer(event) {
    
    let rightAnswer;
    if (operator === "sum") {
      rightAnswer = number.split(",").reduce((a, b) => Number(a) + Number(b), 0)
    }

    if (operator === "average") {
      rightAnswer = number.split(",").reduce((a, b) => Number(a) + Number(b), 0)/number.split(",").length
    }

    if (operator === "mode") {
      let obj = {}
      let split = number.split(",")
      for (let num of split) {
        obj[num] = obj[num] + 1 || 1
      }
      let entries = Object.entries(obj).sort((a, b) => a[1] - b[1])
      rightAnswer = entries[entries.length - 1][0]
    }

    event.preventDefault()
    setResult(
      {
        number: number,
        operation: operator,
        answer: rightAnswer, 
      }
    )
    console.log(rightAnswer)
  }
  return (
    <>
      <form  onSubmit={getAnswer}>
        <input id="values" name="values" type="text" onChange={getNumbers}value={number}/>
        <select id="operation" name="operation" onChange={getOption}>
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{result.answer}</p>
      </section>
    </>
  );
}

export default Form;
