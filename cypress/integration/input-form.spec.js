describe('Input Form', () => {
  beforeEach(() => {
    // cy.seedAndVisit([])
    // cy.seedAndVisit('fixture:todos')
    cy.server()
      .route('/api/todos', [])
      .visit('/')
  })

  it('focuses input on load', () => {
    cy.focused()
      .should('have.class', 'new-todo')
  })

  it('accepts input', () => {
    const inputText = 'This is a test'

    cy.get('.new-todo')
      .type(inputText)
      .should('have.value', inputText)
  })

  describe('Form submission', () => {
    beforeEach(() => {
      cy.server()
    })

    it('Adds a new todo on submit', () => {
      cy.route('POST', '/api/todos', {
        name: 'test',
        id: 1,
        isComplete: false
      })

      cy.get('.new-todo')
        .type('test')
        .type('{enter}')
        .should('have.value', '')

      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', 'test')
    })

    it('Shows an error on a failed submit', () => {
      cy.route({
        url: '/api/todos',
        method: 'POST',
        status: 500,
        response: {}
      })

      cy.get('.new-todo')
        .type('test{enter}')
        .get('.todo-list li')
        .should('not.exist')
        // .should('have.length', 0)
        .get('.error')
        .should('be.visible')
    })
  })

})
