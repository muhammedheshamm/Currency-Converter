import React from 'react'

export default function row(props) {
  return (
    <div>
        <input type="number" value={props.amount} onChange={props.onChangeAmount}/>
        <select value={props.selected} onChange={props.handleChange}>
            {props.options.map(option => (
              <option key={option} value={option} >{option}</option>
            ))}
            
        </select>
    </div>
  )
}
