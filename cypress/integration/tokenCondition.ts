describe('Test different token case', () => {
    const testValueCookies = [
        {
            "context": "Admin user"
        },
        {
            "context": "rls user"
        }
    ]
    let cookie="";

    describe('Automation Test Suite - Fixtures', function () {
        const TestDatas = require('../fixtures/testDataMultipleFeild');
        //looping through both the fixtues 
        testValueCookies.forEach((fixtureData) => {
            describe(fixtureData.context, () => {
                console.log(fixtureData.context)
                if (fixtureData.context === "Admin user") {
                    cookie = Cypress.env('admin_user')
                    console.log(cookie)
                } else if (fixtureData.context === "rls user") {
                    cookie = Cypress.env('rls_user')
                    console.log(cookie)
                } else {
                    console.log("kindly check some issue")
                }
                TestDatas.sp.forEach((fixtureData, i) => {
                    it("API", function () {

                        cy.visit("https://google.com");
                        cy.readFile('cypress/fixtures/testDataMultipleFeildUsingList.json').then((list) => {
                            cy.log(list.sp[i].filters);
                            Cypress.$.extend(true, list.query, list.sp[i].filters)
                            cy.writeFile('writeData.json', list.query)
                            cy.log(list.query)
                            cy.request({
                                method: 'POST',
                                url: 'https://reqres.in/api/users',
                                body: list.query,
                            }).then((response: any) => {
                                cy.log(response)
                            })
                        })
                    })
                })

            })
        })
    })
})
