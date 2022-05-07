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

    it("Coefficient Can Be A Float Number", () => {
        cy.get(LocatorConstants.ONE_KEY).click();
        cy.get(LocatorConstants.DECIMAL_KEY).click();
        cy.get(LocatorConstants.TWO_KEY).click();
        cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
        cy.get(LocatorConstants.ONE_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering1PointTwoE1) => {
            cy.wrap($displayAfterEntering1PointTwoE1).should("have.text", "1.2 e 1");
        });
    });
});
