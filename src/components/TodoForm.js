import React from 'react'

export default props => 
  <form onSubmit={props.handleSubmit}>
    <input
      type='text'
      autoFocus
      value={props.currentTodo}
      onChange={props.handleChange}
      className="new-todo"
      placeholder="What needs to be done?"/>
  </form>