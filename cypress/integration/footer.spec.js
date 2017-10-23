describe('Footer', () => {
  beforeEach(() => {
    cy.server()
    cy.fixture('todos')
      .then(data => {
        const updatedData = data.map((todo, idx) => idx % 2 === 0 ? todo : Object.assign({}, todo, {isComplete: true}))
        cy.route('GET', '/api/todos', updatedData)
      })
      .visit('/')
  })
  
  // it('Filters to active items', () => {
  //   cy.contains('Active')
  //     .click()

  //   cy.get('.todo-list li')
  //     .should('have.length', 2)
  // })

  // it('Filters to completed items', () => {
  //   cy.contains('Completed')
  //     .click()

  //   cy.get('.todo-list li')
  //     .should('have.length', 2)
  // })

  it('Applies filters properly', () => {
    debugger;
    const filters = [
      {link: 'Active', expectedLength: 2},
      {link: 'Complete', expectedLength: 2},
      {link: 'All', expectedLength: 4}
    ]

    cy.wrap(filters)
      .each(filter => {
        cy.contains(filter.link)
          .click()

        cy.get('.todo-list li')
          .should('have.length', filter.expectedLength)
      })
  })
})