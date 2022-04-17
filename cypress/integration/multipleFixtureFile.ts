describe('Test Automation for using multiple fixture file', () => {
    const testValueFixtures = [
        {
            "name": "credentials",
            "context": "1"
        },
        {
            "name": "userData",
            "context": "2"
        }
    ]

    describe('Automation Test Suite - Fixtures', function () {
        //looping through both the fixtues 
        testValueFixtures.forEach((fixtureData) => {
            describe(fixtureData.context, () => {
                // accessing the test data from the fixture file
                before(function () {
                    cy.fixture(fixtureData.name).then(function (testData) {
                        this.testData = testData;
                    })
                })
                it("login", function () {
                    cy.visit('https://admin-demo.nopcommerce.com/admin/')
                    cy.get('[id=Email]').clear()
                    cy.get('[id=Email]').type(this.testData.username)
                    cy.get('[id=Password]').clear()
                    cy.get('[id=Password]').type(this.testData.password)
                    cy.get('[type=submit]').click();

                    cy.url().should('be.equal', this.testData.adminUrl)

                })
            })
        })
    })
})
