/// <reference types ="cypress"/>
import 'cypress-wait-until';
//import 'cypress-audit/commands';
import '../support/index'

Cypress.Commands.add('closeModalPopUp', () => {
    cy.waitUntil(() => cy.get('div[class="close-icon"]').then($el => $el.length > 0));
    cy.get('div[class="close-icon"]')
        .should('be.visible')
        .click({ force: true });

    // cy.get('body').should('exist').then((popup) => {
    //     if (popup.find('div[class="close-icon"]').length > 0) {
    //         cy.log('found');
    //         cy.get('div[class="close-icon"]')
    //             .should('be.visible')
    //             .click({ force: true });

    //     } else {
    //         cy.log('cy.exist() - Element did not exist!');

    //     }
    // });
});

Cypress.Commands.add('pageLoaded', () => {
    cy.waitUntil(() => cy.window().then(win => win.document.readyState === 'complete'));
});
// Cypress.Commands.add('pageLoaded', { prevSubject: 'element' }, () => cy.waitUntil(() => cy.window().then(win => win.document.readyState === 'complete')));

// Cypress.Commands.add('closeModalPopUp', () => {
//     cy.get('body')
//         .then(() => {
//             cy.get('div[class="close-icon"]')
//                 .should('be.visible')
//                 .click({ force: true });
//         })
// })
//});
/* Cypress.Commands.add('closeModalPopUp', () => {
    cy.get('body')
        .then(() => {
            cy.get('article[class="card announcement-box modal-effect"]'
                , { timeout: 10000 })
                .then(() => {
                    cy.get('div[class="close-icon"]')
                        //.should('be.visible')
                        .click({ force: true });
                })
        })
}); */

Cypress.Commands.add('assertElementTextValue', (elements, text, waitTime) => {
    waitTime !== undefined ? cy.wait(waitTime) : cy.wait(0);
    expect(elements.text()).to.include(text);
});

Cypress.Commands.add('getCurrentURL', (waitTime?) => {
    waitTime !== undefined ? cy.wait(waitTime) : cy.wait(0);
    return cy.url();
});

Cypress.Commands.add('getDashboardLink', (linkName) => {
    return cy.get('a[href*="/dashboard"]').contains(linkName);
});

Cypress.Commands.add('isLabelDisabled', (element) => {
    expect(element.include('disabled'));
});

Cypress.Commands.add('printLog', (message) => {
    cy.log(message);
});

/*
*For IAMv2
*/
Cypress.Commands.add(
    'NavigateToEpicSSOLogin',
    () => {
        //cy.visit('/');
        cy.loginWithSSOButtonPushes();
    }
);

Cypress.Commands.add(
    'loginWithSSOButtonPushes',
    () => {
        cy.get('[class="btn-lg d-block btn btn-primary"]').click();
        /* cy.window().then(epicSSOWindow => {
           const stub = cy.stub(epicSSOWindow, 'open').onFirstCall().returns(window);
           
   
           cy.get('[class="btn-lg d-block btn btn-primary"]').click().then(() =>{
               const url = stub.getCall(0).args[0];
           })
           ;
       });  */
    });


/**
* Given a function with some commands that cause the page to change or even
* just reload, this command runs the command then waits for that page load.
*
* Ideally this command should be used sparingly, instead preferring to use
* matching functionality to wait for reload.
*
* Adapted from:
* https://github.com/cypress-io/cypress/issues/1805#issuecomment-525482440
*/
// Cypress.Commands.add("waitForPageLoadAfter", block => {
//     // mark our window object to "know" when it gets reloaded
//     cy.window().then(win => {
//       // eslint-disable-next-line no-param-reassign
//       win.beforeReload = true;
//     });
//     // initially the new property is there
//     cy.window().should("have.prop", "beforeReload", true);

//     // Run the code that triggers the page reload/change
//     block();

//     // after reload the property should be gone
//     cy.window().should("not.have.prop", "beforeReload");
//   });

Cypress.Commands.add('getGoogleBigqueryResult', () => {
    return cy.request({
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v4/token',
        body: {
            grant_type: 'refresh_token',
            client_id: Cypress.env('client_id'),
            client_secret: Cypress.env('client_secret'),
            refresh_token: Cypress.env('refresh_token'),
        },
    })
});

function getStartDate() {
    var now = new Date();
    var lastday = new Date(now.getFullYear(), now.getMonth(), 0);
    var firstday = new Date(lastday.getFullYear(), lastday.getMonth(), 1);
    var startdate: any = firstday.getFullYear() * 1e4 + (firstday.getMonth() + 1) * 100 + firstday.getDate();
    return startdate;
}

function getEndDate() {
    var now = new Date();
    var lastday = new Date(now.getFullYear(), now.getMonth(), 0);
    var endDate: any = lastday.getFullYear() * 1e4 + (lastday.getMonth() + 1) * 100 + lastday.getDate();;
    return endDate;

}
Cypress.Commands.add('getPreviousMonthStartDate', () => {
    return cy.wrap(getStartDate()); //return the wrap and use in chain
});
Cypress.Commands.add('getPreviousMonthEndDate', () => {
    return cy.wrap(getEndDate()); //return the wrap and use in chain
});

Cypress.Commands.add('getAdminUserToken', () => {
    return cy.wrap(gettoken())
});

function gettoken() {
    cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/users',
        body: {
            "name": "tin",
            "job": "sailor"
        },
    }).then((response: any) => {
        cy.log(response)
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: {
                "name": "tin",
                "job": "sailor"
            },
        }).then((response: any) => {
            return cy.log(response)

        })

    })
}