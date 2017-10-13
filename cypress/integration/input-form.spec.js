describe('Input Form', () => {
  beforeEach(() => {
    cy.visit('localhost:3030')
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
      cy.route('POST', 'http://localhost:3030/api/todos', {
        name: 'test',
        id: 1,
        isComplete: false
      })
  
      cy.get('.new-todo')
        .type('test')
        .type('{enter}')
        .should('have.value', '')
        .get('.todo-list li')
        .should('have.length', 1)
        .and('contain', 'test')
    })
  
    it('Shows an error on a failed submit', () => {
      cy.route({
        url: 'http://localhost:3030/api/todos',
        method: 'POST',
        status: 500,
        response: {}
      })
  
      cy.get('.new-todo')
        .type('test{enter}')
        .get('.todo-list li')
        .should('have.length', 0)
        .get('h1.error')
        .should('be.visible')
    })
  })

})