import React, {Component} from 'react'

export default class TodoApp extends Component {
  render () {
    return (
      <div>
      <header className="header">
        <h1>todos</h1>
        <form>
          <input
            className="new-todo"
            placeholder="What needs to be done?"/>
        </form>
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