import React, {Component} from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import {saveTodo, fetchTodos} from '../lib/service'

export default class TodoApp extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentTodo: '',
			todos: []
		}

		this.handleNewTodoChange = this.handleNewTodoChange.bind(this)
		this.handleTodoSubmit = this.handleTodoSubmit.bind(this)
	}

	componentDidMount () {
		fetchTodos()
			.then(({data}) => this.setState({todos: data}))
			.catch(() => this.setState({error: true}))
			
	}

	handleNewTodoChange (evt) {
		this.setState({currentTodo: evt.target.value})
	}

	handleTodoSubmit (evt) {
		evt.preventDefault()
		const newTodo = {name: this.state.currentTodo, isComplete: false}
		saveTodo(newTodo)
			.then(({data}) => this.setState({todos: this.state.todos.concat(data), currentTodo: ''}))
			.catch(() => this.setState({error: true}))
	}

  render () {
    return (
      <div>
      <header className="header">
        <h1>todos</h1>
				{this.state.error ? <h1 className='error'>Oh no!</h1> : null}
        <TodoForm
					handleSubmit={this.handleTodoSubmit}
					currentTodo={this.state.currentTodo}
					handleChange={this.handleNewTodoChange} />
      </header>
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <TodoList todos={this.state.todos} />
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