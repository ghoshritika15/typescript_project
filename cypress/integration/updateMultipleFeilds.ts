const TestDatas = require('../fixtures/testDataMultipleFeild');

describe('Automation Test Suite - Fixtures', function () {
    TestDatas.sp.forEach((fixtureData, i) => {

        it("API", function () {
            cy.visit("https://google.com");
            cy.readFile('cypress/fixtures/testDataMultipleFeild.json').then((item) => {
                item.query.name = item.sp[i].filters.name
                item.query.job = item.sp[i].filters.job
                // cy.writeFile('testDataMultipleFeild.json', item.query)
                cy.writeFile('writeData.json', item.query)
                cy.log(item.query)
                cy.request({
                    method: 'POST',
                    url: 'https://reqres.in/api/users',
                    body: item.query,
                }).then((response: any) => {
                    cy.log(response)
                })
            })


        })

    })
})
// })
