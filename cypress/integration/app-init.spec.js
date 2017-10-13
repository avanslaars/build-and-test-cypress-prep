describe('App Initialization', () => {
  beforeEach(() => {
    cy.server()
  })

  it('Fetches todos on page load', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3030/api/todos',
      response: [
        {id: 1, name: 'Buy Milk', isComplete: true},
        {id: 2, name: 'Buy Eggs', isComplete: true},
        {id: 3, name: 'Buy Bread', isComplete: true},
        {id: 4, name: 'Make French Toast', isComplete: false}
      ]
    })
    cy.visit('http://localhost:3030')
    cy.get('.todo-list li')
      .should('have.length', 4)
  })

  it('Shows an error on failure to fetch', () => {
    cy.route({
      url: 'http://localhost:3030/api/todos',
      method: 'GET',
      status: 500,
      response: []
    })
    cy.visit('http://localhost:3030')
    cy.get('.todo-list li')
      .should('have.length', 0)
      .get('h1.error')
      .should('be.visible')
  })
})