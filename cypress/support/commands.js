// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('SignIn',()=>{
    cy.contains('Don´t have an account yet?').click()
})

Cypress.Commands.add('LogIn',({username,password})=>{
    cy.request('POST', 'http://localhost:3001/api/login',{username,password}).then(({body})=>{
        localStorage.setItem('loggedUserTaskApp', JSON.stringify(body))
        cy.visit('http://localhost:5173')
    })
})
Cypress.Commands.add('CreateTask',({content,responsible})=>{
    cy.request({
        url: 'http://localhost:3001/api/tasks',
        method: 'POST',
        body: {content,responsible},
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUserTaskApp')).token}`
        }
      })
      cy.visit('http://localhost:5173')
})