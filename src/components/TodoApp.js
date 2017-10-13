import React, {Component} from 'react'
import TodoForm from './TodoForm'

export default class TodoApp extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentTodo: ''
		}

		this.handleNewTodoChange = this.handleNewTodoChange.bind(this)
	}

	handleNewTodoChange (evt) {
		this.setState({currentTodo: evt.target.value})
	}

  render () {
    return (
      <div>
      <header className="header">
        <h1>todos</h1>
        <TodoForm 
					currentTodo={this.state.currentTodo}
					handleChange={this.handleNewTodoChange} />
      </header>
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <ul className="todo-list">
        <li>
					<div className="view">
						<input className="toggle" type="checkbox" />
						<label>
							Make it work
						</label>
						<button className="destroy" />
					</div>
					<input ref="editField" className="edit" />
				</li>
        </ul>
      </section>
      <footer className="footer">
					<span className="todo-count">
						<strong>0</strong> todos left
					</span>
					<ul className="filters">
						<li><a href="/" >All</a></li>
						{' '}
						<li><a href="/active">Active</a></li>
						{' '}
						<li><a href="/completed">Completed</a></li>
					</ul>
					<button className="clear-completed">
						Clear completed
					</button>
				</footer>
    </div>
    )
  }
}