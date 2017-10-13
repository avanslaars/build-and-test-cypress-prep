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
})