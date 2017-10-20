const clearDatabase = () => {
  cy.request('GET', '/api/todos')
    .its('body')
    .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`))
}

describe('Smoke Tests', () => {
  beforeEach(clearDatabase)
  after(clearDatabase)

  context('With no todos', () => {
    it('Creates some todos', () => {
      cy.visit('/')
      cy.server()
      cy.route('POST', '/api/todos')
        .as('create')
      
      const items = [
        {text: 'One', expected: 1},
        {text: 'Two', expected: 2},
        {text: 'Three', expected: 3}
      ]
  
      items.forEach(item => {
        cy.focused()
          .type(`${item.text}{enter}`)
          .wait('@create')
    
        cy.get('.todo-list li')
          .should('have.length', item.expected)
      })
    })
  })

  context('With active todos', () => {
    beforeEach(() => {
      cy.fixture('todos')
        .each(todo => cy.request('POST', '/api/todos', todo))
      cy.visit('/')
    })
    
    it.only('Loads existing data from the database', () => {
      cy.get('.todo-list li')
        .should('have.length', 5)
    })
    
    it('Deletes some todos', () => {
      cy.server()
      cy.route('DELETE', '/api/todos/*')
        .as('delete')
      cy.get('.todo-list li')
        .each($el => {
          cy.wrap($el)
            .find('.destroy')
            .invoke('show')
            .click()
            .wait('@delete')
        })
        .should('have.length', 0)
    })

    it('Toggles todos', () => {
      cy.server()
      cy.route('PUT', '/api/todos/*')
        .as('update')
    
      const clickAndWait = ($el) => {
          cy.wrap($el)
            .as('item')
            .find('input[type="checkbox"]')
            .click()
            .wait('@update')
      }

      cy.get('.todo-list li')
        .each($el => {
          clickAndWait($el)
          cy.get('@item')
            .should('have.class', 'completed')
        })
        .each($el => {
          clickAndWait($el)
          cy.get('@item')
            .should('not.have.class', 'completed')
        })
    })
  })

  context.skip('With mixed todos', () => {
    beforeEach(() => {
      cy.fixture('todos')
        .each((todo, idx) => cy.request('POST', '/api/todos', Object.assign({}, todo, {isComplete: idx % 2 === 0})))
      cy.visit('/')
    })

    it('Filters todos', () => {
      const filters = [
        {link: 'Active', expectedLength: 2},
        {link: 'Complete', expectedLength: 2},
        {link: 'All', expectedLength: 4}
      ]
  
      filters.forEach(filter => {
        cy.contains(filter.link)
          .click()
  
        cy.get('.todo-list li')
          .should('have.length', filter.expectedLength)
      })
    })
  })
})