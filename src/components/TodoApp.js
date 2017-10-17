import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import {saveTodo, fetchTodos, updateTodo, destroyTodo} from '../lib/service'

const filterTodos = (filter, todos) => filter
	? todos.filter(todo => todo.isComplete === (filter === 'completed'))
	: todos

export default class TodoApp extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentTodo: '',
			todos: []
		}

		this.handleNewTodoChange = this.handleNewTodoChange.bind(this)
		this.handleTodoSubmit = this.handleTodoSubmit.bind(this)
		this.handleToggle = this.handleToggle.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
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

	handleToggle (id) {
		const targetTodo = this.state.todos.find(t => t.id === id)
		const updated = {...targetTodo, isComplete: !targetTodo.isComplete}
		updateTodo(updated)
			.then(({data}) => {
				const todos = this.state.todos.map(todo => todo.id === data.id ? data : todo)
				this.setState({todos: todos})
			})
			.catch(() => this.setState({error: true}))

	}

	handleDelete (id) {
		destroyTodo(id)
			.then(() => this.setState({todos: this.state.todos.filter(todo => todo.id !== id)}))
			.catch(() => this.setState({error: true}))
	}

  render () {
		const remaining = this.state.todos.filter(t => !t.isComplete).length
    return (
				<Router>
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
						<Route path='/:filter?' render={({match}) => 
							<TodoList todos={filterTodos(match.params.filter, this.state.todos)} handleToggle={this.handleToggle} handleDelete={this.handleDelete} />
						} />
					</section>
					<Footer remaining={remaining} />
			</div>
				</Router>
    )
  }
}