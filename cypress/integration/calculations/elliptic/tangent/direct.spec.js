import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Trigonometric Function Keys - Tangent", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.reload();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
            cy.wrap($displayAfterReload).should("have.text", "0");
            cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
                cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
            });

            cy.get(LocatorConstants.SHIFT_KEY).then(
                ($shiftKeyAfterKeyHasBeenSelected) => {
                    cy.wrap($shiftKeyAfterKeyHasBeenSelected).should("have.text", "2nd");
                    cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
                }
            );
        });
    });

    it('Functionality Not Implemented, Return "Not Implemented" Message To User', () => {
        cy.get(LocatorConstants.TANGENT_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
            cy.wrap($displayAfterReload).should(
                "have.text",
                MessageConstants.NOT_IMPLEMENTED
            );
        });
    });
});
