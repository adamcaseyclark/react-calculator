import { LocatorConstants } from "../../../constants/locators";

describe("Exponential Notation (EE) Calculation - No Values", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
            cy.wrap($displayAfterReload).should("have.text", "0");
            cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
                cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
            });
        });
    });

    it("Calculate When Both Coefficient And Exponent Are Zero", () => {
        cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEnteringEmptyNotation) => {
            cy.wrap($displayAfterEnteringEmptyNotation).should("have.text", "0 e 0");

            cy.get(LocatorConstants.EQUALS_KEY).click();

            cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterCalculating) => {
                cy.wrap($displayAfterCalculating).should("have.text", "0");
            });
        });
    });
});
