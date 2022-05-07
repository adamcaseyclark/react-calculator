import { LocatorConstants } from "../../constants/locators";

describe("Six Number Key Functionality", () => {
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

    it("Selecting The Six Key Will Display A 6", () => {
        cy.get(LocatorConstants.SIX_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterZeroAnd3Sevens) => {
                cy.wrap($displayAfterZeroAnd3Sevens).should("have.text", "6");
            }
        );
    });
});
