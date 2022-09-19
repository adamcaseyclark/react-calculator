import { LocatorConstants } from "../../../constants/locators";

describe("numbers after function keys - remove radical 2", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
            cy.wrap($displayAfterLoading).should("have.text", "0");
            cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
                cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
            });
        });
    });

    it("2 after x remove radical 2 displays 2, not 02", () => {
        cy.get(LocatorConstants.REMOVE_THE_INDEX_2_RADICAL).click()
        cy.get(LocatorConstants.TWO_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterRadicalKey2And2) => {
                cy.wrap($displayAfterRadicalKey2And2).should("not.have.text", "02");
                cy.wrap($displayAfterRadicalKey2And2).should("have.text", "2");
            }
        );
    });
});
