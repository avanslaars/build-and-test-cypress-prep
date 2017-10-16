describe('List Items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })

  it('toggles todos', () => {
    cy.get('.todo-list li')
  })
})