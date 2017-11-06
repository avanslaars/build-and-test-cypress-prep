// @ts-check
describe('List Items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })

  it.only('toggles todos', () => {
    // cy.fixture('todos')
    //   .then(todos => {
    //     cy.route('PUT', '/api/todos/1', Object.assign({}, todos[0], {isComplete: true}))
    //   })
    cy.route('PUT', `/api/todos/1`, {
      "id": 1,
      "name": "Buy Milk",
      "isComplete": true
    })

    // cy.pause()

    cy.get('.todo-list li')
      .first()
      .as('first-todo')

    cy.get('@first-todo')
      .find('input[type="checkbox"]')
      .click()

    cy.get('@first-todo')
      .should('have.class', 'completed')

    cy.get('.todo-count')
      .should('contain', '3')
  })

  it('Shows an error message on toggle failure', () => {
    cy.route({
     url: `/api/todos/1`,
     method: 'PUT',
     status: 500,
     response: {}
    })

    cy.get('.todo-list li')
      .first()
      .find('input[type="checkbox"]')
      .click()

    cy.get('.error')
      .should('be.visible')
  })

  it('Removes a todo', () => {
    cy.route({
      url: `/api/todos/1`,
      method: 'DELETE',
      status: 200,
      response: {}
     })

    cy.get('.todo-list li')
     .first()
     .find('.destroy')
     .invoke('show') // Make the button visible
     .click()

    cy.get('.todo-list li')
     .should('have.length', 3)

  })
})
