import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Trigonometric Function Keys - Tangent, Hyperbolic, Inverse", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.reload();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
      cy.wrap($displayAfterReload).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
        cy.get(LocatorConstants.SHIFT_KEY).click();
        cy.get(LocatorConstants.SHIFT_KEY).then(
            ($shiftKeyAfterKeyHasBeenSelected) => {
              cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
                  "have.text",
                  "2nd"
              );
              cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");
            }
        );
      });
    });
  });

  it('Functionality Not Implemented, Return "Not Implemented" Message To User, Remains Shifted', () => {
    cy.get(LocatorConstants.INVERSE_HYPERBOLIC_TANGENT_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
      cy.wrap($displayAfterReload).should(
          "have.text",
          MessageConstants.NOT_IMPLEMENTED
      );
      cy.get(LocatorConstants.SHIFT_KEY).then(
          ($shiftKeyAfterKeyHasBeenSelected) => {
            cy.wrap($shiftKeyAfterKeyHasBeenSelected).should("have.text", "2nd");
            cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");
          }
      );
    });
  });
});
