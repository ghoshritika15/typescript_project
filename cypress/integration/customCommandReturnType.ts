describe('Get Start Date', () => {
    it('getting start date from custom command', () => {
        
        cy.visit("https://google.com")

        cy.getPreviousMonthStartDate().then(task => {
            cy.log(task);
        })
        cy.getPreviousMonthEndDate().then(task => {
            cy.log(task);
        })
    })
})