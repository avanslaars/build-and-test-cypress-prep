const toggleAllTodos = shouldHaveClass => $el => {
  const chainer = `${shouldHaveClass ? '' : 'not.'}have.class`
  cy.wrap($el)
    .as('item')
    .find('input[type="checkbox"]')
    .click()
    .wait('@update')

  cy.get('@item')
    .should(chainer, 'completed')
}

describe('Smoke Tests', () => {
  beforeEach(() => {
    cy.fixture('todos')
      .each(todo => cy.request('POST', '/api/todos', todo))
    cy.server()

    cy.route('PUT', '/api/todos/*')
      .as('update')
    cy.route('POST', '/api/todos')
      .as('create')

    cy.visit('/')
  })

  afterEach(() => {
    cy.request('GET', '/api/todos')
      .its('body')
      .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`))
  })  

  it('Loads existing data from the database', () => {
    cy.get('.todo-list li')
      .should('have.length', 4)
  })

  it('Toggles todos', () => {
    // cy.server()
    // cy.route('PUT', '/api/todos/*')
    //   .as('update')

    cy.get('.todo-list li')
      .each(toggleAllTodos(true))
      .each(toggleAllTodos(false))
  })

  it('Filters todos', () => {
    cy.get('.todo-list li')
      .as('todos')
      .each(($el, idx) => {
        if (idx % 2 === 0) {
          cy.wrap($el)
            .find('input[type="checkbox"]')
            .click()
            .wait('@update')
        }
      })
    
      /**
       * Interesting behavior:
       * I had to use `cy.get('.footer')` here because without it
       * `.contains()` was relative to the previous subject (the result of the previous `get`)
       * That makes sense, but then after this `click()` I use `get` with an alias, and then
       * make a new `contains()` calls, and that one works, which tells me it is relative to
       * what is yielded by `get('.footer')`, not what is yielded by the `get('@todos')`.
       * I'm sure there is a reason
       */

    // CypressError: Timed out retrying: Expected to find content: 'Active' within the element: [ <li.completed>, 3 more... ] but never did.
    // cy.contains('Active')
    //   .click()

    cy.get('.footer')
      .contains('Active')
      .click()
    
    // I get the todos again
    cy.get('@todos')
      .should('have.length', 2)

    // Why doesn't this one fail?
    cy.contains('Completed')
      .click()
    
    cy.get('@todos')
      .should('have.length', 2)

    cy.contains('All')
      .click()
    
    cy.get('@todos')
      .should('have.length', 4)
  })

  it.only('Creates a few todos', () => {
    cy.focused()
      .type('One{enter}')
      .wait('@create')

    cy.get('.todo-list li')
      .should('have.length', 5)
  })
})