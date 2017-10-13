describe('Input Form', () => {
  it('focuses input on load', () => {
    cy.visit('localhost:3030')
      .focused()
      .should('have.class', 'new-todo')
  })

  it.only('accepts input', () => {
    const inputText = 'This is a test'

    cy.visit('localhost:3030')
      .get('.new-todo')
      .type(inputText)
      .should('have.value', inputText)
  })
})