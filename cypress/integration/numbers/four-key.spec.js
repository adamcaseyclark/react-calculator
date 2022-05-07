import { LocatorConstants } from "../../constants/locators";

describe("Four Number Key Functionality", () => {
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

    it("Selecting The Four Key Will Display A 4", () => {
        cy.get(LocatorConstants.FOUR_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterAdding4) => {
                cy.wrap($displayAfterAdding4).should("have.text", "4");
            }
        );
    });
});
