describe('Blog ', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3003/api/reset')
        const user ={
            name: 'Test User',
            username: 'testuser',
            password: 'testpassword'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    
    it('front page can be opened', function(){
        cy.contains('Blog')
    })
    it('login is functional', function(){
        cy.get("#togglableButton").click()
        cy.get("#Username").type("testuser")
        cy.get("#Password").type("testpassword")
        cy.get("#Login").click()
        cy.contains("Test User logged in")
    })
    it('login fails with incorrect credentials', function(){
        cy.get("#togglableButton").click()
        cy.get("#Username").type("testuser")
        cy.get("#Password").type("nottestpassword")
        cy.get("#Login").click()
        cy.contains("Incorrect username or password")
    })
    
    describe('When logged in', function(){
        beforeEach(function(){
            cy.get("#togglableButton").click()
            cy.get("#Username").type("testuser")
            cy.get("#Password").type("testpassword")
            cy.get("#Login").click()
        })
    
        it('a new blog can be created', function(){
            cy.get(".titleInput").type("cypresstestblog")
            cy.get(".authorInput").type("cypresstestauthor")
            cy.get(".urlInput").type("cypresstest.url")
            cy.get("#blogButton").click()
            cy.contains("cypresstestblog: By cypresstestauthor")
        })
    })
})