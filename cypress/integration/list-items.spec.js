// @ts-check
describe('List Items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })

  it('Properly identifies completed items', () => {
    cy.get('.todo-list li')
      .filter('.completed')
      .should('have.length', 1)
      .and('contain', 'Eggs')
      // .find('input[type="checkbox"]')
      .find('.toggle')
      .should('be.checked')
  })

  it('Shows the correct number of remaining items in the footer', () => {
    cy.get('.todo-count')
      .should('contain', 3)
  })

  it.only('marks an incomplete item complete', () => {
    cy.fixture('todos')
      .then(todos => {
        // const target = todos[0]
        const target = Cypress._.head(todos)
        // cy.route('PUT', `/api/todos/${target.id}`, Object.assign({}, target, {isComplete: false}))
        cy.route('PUT', `/api/todos/${target.id}`, Cypress._.merge(target, {isComplete: true}))
      })

    // cy.pause()

    cy.get('.todo-list li')
      .first()
      .as('first-todo')

    cy.get('@first-todo')
      .find('.toggle')
      .click()
      .should('be.checked')

    cy.get('@first-todo')
      .should('have.class', 'completed')

    cy.get('.todo-count')
      .should('contain', '2')
  })

  it('marks a complete item incomplete', () => {
    cy.fixture('todos')
      .then(todos => {
        // const target = todos[1]
        const target = Cypress._.nth(todos, 1)
        // cy.route('PUT', `/api/todos/${target.id}`, Object.assign({}, target, {isComplete: true}))
        cy.route('PUT', `/api/todos/${target.id}`, Cypress._.merge(target, {isComplete: false}))
      })

    // cy.pause()

    cy.get('.todo-list li')
      .first()
      .next()
      .as('second-todo')

    cy.get('@second-todo')
      // .find('input[type="checkbox"]')
      .find('.toggle')
      .click()

    cy.get('@second-todo')
      .should('not.have.class', 'completed')

    cy.get('.todo-count')
      .should('contain', '4 todos')
  })

  // it('Shows an error message on toggle failure', () => {
  //   cy.route({
  //    url: `/api/todos/1`,
  //    method: 'PUT',
  //    status: 500,
  //    response: {}
  //   })

  //   cy.get('.todo-list li')
  //     .first()
  //     .find('input[type="checkbox"]')
  //     .click()

  //   cy.get('.error')
  //     .should('be.visible')
  // })

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
