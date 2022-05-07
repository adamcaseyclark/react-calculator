import { LocatorConstants } from "../../constants/locators";

describe("Seven Number Key Functionality", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.reload();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
            cy.wrap($displayAfterReload).should("have.text", "0");
            cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
                cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
            });
        });
    });

    it("Selecting The Seven Key Will Display A 7", () => {
        cy.get(LocatorConstants.SEVEN_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterZeroAnd3Sevens) => {
                cy.wrap($displayAfterZeroAnd3Sevens).should("have.text", "7");
            }
        );
    });
});
