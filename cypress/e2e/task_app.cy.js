describe('Task_app',()=>{
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users',{username:"Omac56",name:"Omar Robledo",password:"spartan",rePassword:"spartan"})
    cy.visit('http://localhost:5173/')
  })

  describe('Login',()=>{
    it('Login form displays first', function(){
      cy.contains('LOGIN')
    })
  
    it('Can change from login to sign-in form',function(){
      cy.contains('Don´t have an account yet?').click()
      cy.contains('SIGN IN')
    })
  
    it('Cannot login while leaving one or more empty inputs',function(){
      cy.contains('LOGIN').click()
      cy.contains('Missing one or more credentials')
  
      cy.contains('LOGIN').parent().find('input').then(inputs=>{
        cy.wrap(inputs[0]).type('Omac56')
      })
      cy.contains('Missing one or more credentials')
    })
  
    it('Cannot access without valid credentials',function(){
      cy.contains('LOGIN').parent().find('input').then(inputs=>{
        cy.wrap(inputs[0]).type('Omac56')
        cy.wrap(inputs[1]).type('zpartan')
      })
      cy.contains('LOGIN').click()
      cy.contains('Invalid credentials')
    })

    it('Can access with valid credentials', function(){
      cy.contains('LOGIN').parent().find('input').then(inputs=>{
        cy.wrap(inputs[0]).type('Omac56')
        cy.wrap(inputs[1]).type('spartan')
      })
      cy.contains('LOGIN').click()
      cy.contains('Access granted')
    })
  })

  describe("Sign in", ()=>{
    beforeEach(function(){
      cy.SignIn()
    })

    it('Can change from sign-in to login form',function(){
      cy.contains('Already an user?').click()
      cy.contains('LOGIN')
    })

    it('Cant create new user with one or more empty inputs',function(){
      cy.contains('SIGN IN').click()
      cy.contains('Missing one or more fields')
      cy.contains('SIGN IN').parent().find('input').then(inputs=>{
        cy.wrap(inputs[0]).type('Omac56')
      })

      cy.contains('SIGN IN').click()
      cy.contains('Missing one or more fields')
      
    })

    it('Passwords need to match',function(){
      cy.contains('SIGN IN').parent().find('input').then(inputs=>{
        cy.wrap(inputs[0]).type('Omac56')
        cy.wrap(inputs[1]).type('Omar Robledo')
        cy.wrap(inputs[2]).type('spartan')
        cy.wrap(inputs[3]).type('zpartan')
      })
      cy.contains('SIGN IN').click()
      cy.contains('Passwords unmatched')
    })

    it('Cannot create new user with existing username', function(){
      cy.contains('SIGN IN').parent().find('input').then(inputs=>{
        cy.wrap(inputs[0]).type('Omac56')
        cy.wrap(inputs[1]).type('Omar Robledo')
        cy.wrap(inputs[2]).type('zpartan')
        cy.wrap(inputs[3]).type('zpartan')
      })
      cy.contains('SIGN IN').click()
      cy.contains('Username already in use')
    })

    it('Can create new user with valid data', function(){
      cy.contains('SIGN IN').parent().find('input').then(inputs=>{
        cy.wrap(inputs[0]).type('test')
        cy.wrap(inputs[1]).type('test')
        cy.wrap(inputs[2]).type('test')
        cy.wrap(inputs[3]).type('test')
      })
      cy.contains('SIGN IN').click()
      cy.contains('Access granted')
      cy.contains('test')
    })

  })

  describe('Task creator',()=>{
    beforeEach(function(){
      cy.LogIn({username:"Omac56",password:"spartan"})
    })

    it('Task creator is shown when user is logged',function(){
      cy.contains('CREATE A NEW TASK')
    })

    it('Cannot create new task while leaving empty data', function(){
      cy.contains('GENERATE').click({force:true})
      cy.contains('Missing fields')

      cy.contains('CREATE A NEW TASK').parent().find('input').then(inputs=>{
        cy.wrap(inputs[0]).type('Blow up DeathStar',{force:true})
      })
      cy.contains('GENERATE').click({force:true})
      cy.contains('Missing fields')
    })

    it('Can create new task with valid data', function(){
      cy.contains('CREATE A NEW TASK').parent().find('input').then(inputs=>{
        cy.wrap(inputs[0]).type('Blow up DeathStar',{force:true})
        cy.wrap(inputs[1]).type('Luke SkyWalker',{force:true})
      })
      cy.contains('GENERATE').click({force:true})
      cy.contains('Task added!')
      cy.contains('Task: Blow up DeathStar')
    })
  })

  describe('When a task is created',()=>{

    beforeEach(function(){
      cy.LogIn({username:"Omac56",password:"spartan"})
      cy.CreateTask({content:"Blow up DeathStar",responsible:"Luke SkyWalker"})
    })

    it('Only task and status fields are initially visible',function(){
      cy.get('#shownInfo').find('p').should('contain','Task:')
      cy.get('#shownInfo').find('p').should('contain','Status:')
    })

    it('Responsible and created fields are not initially visible',function(){
      cy.get('#shownInfo').find('p').should('not.contain','Responsible:')
      cy.get('#shownInfo').find('p').should('not.contain','Created:')
    })

    it('Info button works for showing and hiding more fields', function(){
      cy.get('#shownInfo').find('svg').click()
      cy.get('#hiddenInfo').find('p').should('contain','Responsible:')

      cy.get('#hiddenInfo').find('svg').click()
      cy.get('#shownInfo').find('p').should('contain','Status:')
    })

    it('Status can be changed with the check button', function(){
      cy.get('#shownInfo').find('p').should('contain','Status: Pending')
      cy.get('#shownInfo').find('button').then(buttons=>{
        cy.wrap(buttons[0]).click()
      })
      cy.visit('http://localhost:5173')
      cy.get('#shownInfo').find('p').should('contain','Status: Terminated')
    })

    it('Task can be deleted by its creator', function(){
      cy.get('#shownInfo').find('button').then(buttons=>{
        cy.wrap(buttons[1]).click()
      })
      cy.visit('http://localhost:5173')
      cy.get('html').should('not.contain', 'Blow up DeathStar')
    })

    it('Task cannot be deleted by another user',function(){
      cy.get('.nav').click()
      cy.SignIn()
      cy.contains('SIGN IN').parent().find('input').then(inputs=>{
        cy.wrap(inputs[0]).type('test')
        cy.wrap(inputs[1]).type('test')
        cy.wrap(inputs[2]).type('test')
        cy.wrap(inputs[3]).type('test')
      })
      cy.contains('SIGN IN').click()
      cy.get('#shownInfo').find('button').then(buttons=>{
        cy.wrap(buttons[1]).click()
      })
      cy.contains('Unauthorized access for deletion')
    })

    describe('Task Filter',()=>{
      beforeEach(function(){
        cy.get('#shownInfo').find('button').then(buttons=>{
          cy.wrap(buttons[0]).click()
        })
        cy.visit('http://localhost:5173')
        cy.CreateTask({content:"Save Elizabeth",responsible:"Will Turner"})
        cy.CreateTask({content:"Kill half of universe",responsible:"Thanos"})
      })

      it('by status',function(){
        cy.get('html').should('contain', 'Kill half of universe')
        cy.get('.check').click()
        cy.get('html').should('not.contain','Kill half of universe')
        cy.get('html').should('contain','Blow up DeathStar')
      })

      it('by search',function(){
        cy.get('.filter').find('input').then(inputs=>{
          cy.wrap(inputs[0]).type('Elizabeth')
        })
        cy.get('html').should('contain','Save Elizabeth')
        cy.get('html').should('not.contain','Kill half of universe')
      })

    })

  })

  describe('Sign Out',()=>{

    beforeEach(function(){
      cy.LogIn({username:"Omac56",password:"spartan"})
    })

    it('Navbar title allows to sign out from session',function(){
      cy.contains('CREATE A NEW TASK')
      cy.get('.nav').click()
      cy.contains('LOGIN')
    })
  })
})