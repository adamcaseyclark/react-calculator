import { LocatorConstants } from "../../constants/locators";

describe("Three Number Key Functionality", () => {
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

    it("Selecting The Three Key Will Display A 3", () => {
        cy.get(LocatorConstants.THREE_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterAdding3) => {
                cy.wrap($displayAfterAdding3).should("have.text", "3");
            }
        );
    });
});
