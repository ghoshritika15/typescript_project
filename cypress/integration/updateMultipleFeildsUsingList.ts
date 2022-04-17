const TestDatas = require('../fixtures/testDataMultipleFeild');


describe('Automation Test Suite - Fixtures', function () {
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
