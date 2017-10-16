describe('List Items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })

  it('toggles todos', () => {
    cy.route('PUT', `http://localhost:3030/api/todos/1`, {
      "id": 1,
      "name": "Buy Milk",
      "isComplete": true
    })
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
     url: `http://localhost:3030/api/todos/1`,
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

  it.only('Removes a todo', () => {
    cy.route({
      url: `http://localhost:3030/api/todos/1`,
      method: 'DELETE',
      status: 202,
      response: {}
     })

    cy.get('.todo-list li')
     .first()
     .find('.destroy')
     .invoke('show') // Make the button visible
     .click()
  })
})