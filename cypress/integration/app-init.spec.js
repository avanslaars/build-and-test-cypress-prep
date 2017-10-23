describe('App Initialization', () => {
  beforeEach(() => {
    cy.server()
  })

  it('Fetches todos on page load', () => {
    // cy.fixture('todos')
    //   .then(data => {
    //     cy.route({
    //       method: 'GET',
    //       url: 'http://localhost:3030/api/todos',
    //       response: data
    //     })
    //   })

    // cy.visit('http://localhost:3030')
    cy.seedAndVisit()

    cy.get('.todo-list li')
      .should('have.length', 4)
  })

  it('Shows an error on failure to fetch', () => {
    cy.route({
      url: '/api/todos',
      method: 'GET',
      status: 500,
      response: []
    })
    cy.visit('/')
    cy.get('.todo-list li')
      .should('not.exist')
      .get('.error')
      .should('be.visible')
  })
})