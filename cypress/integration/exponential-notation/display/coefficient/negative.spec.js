import { LocatorConstants } from "../../../../constants/locators";

describe("Exponential Notation (EE) Display - Coefficient", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
            cy.wrap($displayAfterReload).should("have.text", "0");
            cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
                cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
            });
        });
    });

    it("Coefficient Can Be A Negative Number", () => {
        cy.get(LocatorConstants.ONE_KEY).click();
        cy.get(LocatorConstants.TOGGLE_POSITIVE_NEGATIVE_KEY).click();
        cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
        cy.get(LocatorConstants.ONE_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering1NegativeE1) => {
            cy.wrap($displayAfterEntering1NegativeE1).should("have.text", "-1 e 1");
        });
    });
});
