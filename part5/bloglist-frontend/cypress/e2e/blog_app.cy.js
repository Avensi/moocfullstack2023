describe("Blog app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        const user = {
            name: "Helena Li",
            username: "heli",
            password: "password"
        }
        cy.request("POST", "http://localhost:3003/api/users/", user)
        cy.visit("http://localhost:3000")
    })
    it("Login form is shown", function() {
        cy.contains("log in")
        cy.contains("username")
        cy.contains("password")
    })
    describe("Login",function() {
        it("succeeds with correct credentials", function() {
            cy.get("#username").type("heli")
            cy.get("#password").type("password")
            cy.get("#login-button").click()
            cy.contains("Helena Li logged in")
        })
        it("fails with wrong credentials", function() {
            cy.get("#username").type("heli")
            cy.get("#password").type("wrong")
            cy.get("#login-button").click()
            cy.contains("Wrong username or password")

        })
    })
    describe("When logged in", function() {
        beforeEach(function() {
            cy.get("#username").type("heli")
            cy.get("#password").type("password")
            cy.get("#login-button").click()
            cy.contains("Helena Li logged in")
        })
        it("A blog can be created", function() {
            cy.contains("new blog").click()
            cy.get("#title-input").type("Dawntrail")
            cy.get("#author-input").type("CBU3")
            cy.get("#url-input").type("https://fr.finalfantasyxiv.com/dawntrail/")
            cy.get("#create-blog-button").click()
            cy.contains("a new blog Dawntrail by CBU3 added")
            cy.contains("Dawntrail CBU3")
        })
        it("A blog can be liked", function() {

            cy.get("#view-button").click()
            cy.get("#like-button").click()
            cy.contains(1)
        })
    })
})