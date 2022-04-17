const Datas = require('../fixtures/testData');

describe('Automation Test Suite - Fixtures', function () {
    Datas.sp.forEach((fixtureData, i) => {

        it("API", function () {
            cy.visit("https://google.com");
            cy.readFile('cypress/fixtures/testData.json').then((item) => {
                item.query.name = item.sp[i].name
                // cy.writeFile('testData.json', item.query)
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
