declare namespace Cypress {
    interface Chainable {
        assertElementTextValue(element: JQuery<HTMLElement>, text: string, interval?: number): any;
        closeModalPopUp(): void;
        getCurrentURL(waitTime?: number): Cypress.Chainable<string>;
        getDashboardLink(linkName: string): Cypress.Chainable<string>;
        isLabelDisabled(element: JQuery<HTMLElement>): any;
        printLog<T>(message: T): any;
        /*
        *IAMv2 login
        */
        loginWithSSOButtonPushes(): void;
        NavigateToEpicSSOLogin(): void;
        pageLoaded(): void;
        getGoogleBigqueryResult(): Cypress.Chainable<any>;
        getPreviousMonthStartDate(): Cypress.Chainable<any>;
        getPreviousMonthEndDate(): Cypress.Chainable<any>;
        getAdminUserToken(): Cypress.Chainable<any>;
    }
}