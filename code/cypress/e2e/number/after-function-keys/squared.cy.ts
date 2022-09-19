import { LocatorConstants } from "../../../constants/locators";

describe("numbers after function keys - squared", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
            cy.wrap($displayAfterLoading).should("have.text", "0");
            cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
                cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
            });
        });
    });

    it("2 after x squared displays 2, not 02", () => {
        cy.get(LocatorConstants.SQUARE_KEY).click()
        cy.get(LocatorConstants.TWO_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterSquaredKeyAnd2) => {
                cy.wrap($displayAfterSquaredKeyAnd2).should("not.have.text", "02");
                cy.wrap($displayAfterSquaredKeyAnd2).should("have.text", "2");
            }
        );
    });
});
