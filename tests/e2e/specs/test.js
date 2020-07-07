// https://docs.cypress.io/api/introduction/api.html

const timestamp = new Date().getTime()
const mainUrl = Cypress.config().baseUrl
const user = {
  name: 'Test user',
  email: `test-${timestamp}@example.com`,
  password: 'test123'
}
const quote = {
  text: 'Test quote',
  author: 'Test author'
}

describe('User', () => {
  it('registers', function() {
    cy.visit('/auth')
    cy.get('#register + div').click()
    cy.get('#register-name').type(user.name)
    cy.get('#register-email').type(user.email)
    cy.get('#register-password').type(user.password + ' {enter}')
    cy.url().should('eq', mainUrl)
  })

  it('logs out', function() {
    cy.visit('/')
    cy.get('.user__signout').click()
    cy.url().should('eq', mainUrl + 'auth')
  })

  it('logs back in', function() {
    cy.visit('/auth')
    cy.get('#login-email').type(user.email)
    cy.get('#login-password').type(user.password + ' {enter}')
    cy.url().should('eq', mainUrl)
  })
})

describe('Adding', () => {
  it('manually', function() {
    cy.visit('/add')
    cy.get('#text').type(quote.text)
    cy.get('#author').type(quote.author + ' {enter}')
    cy.url().should('eq', mainUrl)
  })

  it('from a suggestion', function() {
    cy.visit('/')
    // Find the suggestion text
    cy.get('.suggestion .quote').invoke('text').then((suggestionText) => {
      // Click the button to add the suggestion to the list
      cy.get('.suggestion button').contains('Add').click()

      // Get the latest added quote and compare with the original suggestion
      cy.get('.list .item .quote').invoke('text').should('eq', suggestionText)
    })
  })
})

/*
describe('Deleting', () => {
  it('previously added manually', function() {
    // Find quote text and click the delete button inside the item
    cy.get('.list .item .quote')
      .contains(quote.text)
      .parents('.item')
      .within(() => {
        cy.get('button[title=Delete]').click()
      })

    // Wait for deletion
    cy.wait(1000)

    // Make sure node has been deleted
    cy.get('.list .item .quote').contains(quote.text).should('not.exist')
  })
})
*/
