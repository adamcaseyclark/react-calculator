import { LocatorConstants } from "../../../../constants/locators";
import { OperationConstants } from "../../../../constants/operations";

describe("Subtraction Operator Behavior - When Key Is Selected", () => {
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

  it("Subtraction Key Will Change Outline When Selected", () => {
    cy.get(LocatorConstants.SUBTRACTION_KEY).then(
      ($shiftKeyAfterKeyHasBeenSelected) => {
        cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
          "have.text",
          OperationConstants.SUBTRACTION
        );
        cy.get(LocatorConstants.SUBTRACTION_KEY_NOT_SELECTED).should(
          "exist"
        );

        cy.get(LocatorConstants.SUBTRACTION_KEY).click();
        cy.get(LocatorConstants.SUBTRACTION_KEY).then(
          ($shiftKeyAfterKeyHasBeenSelected) => {
            cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
              "have.text",
              OperationConstants.SUBTRACTION
            );
            cy.get(LocatorConstants.SUBTRACTION_KEY_WHEN_SELECTED).should(
              "exist"
            );

            cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
            cy.get(LocatorConstants.SUBTRACTION_KEY).then(
              ($shiftKeyAfterKeyHasBeenSelected) => {
                cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
                  "have.text",
                  OperationConstants.SUBTRACTION
                );
                cy.get(LocatorConstants.SUBTRACTION_KEY_NOT_SELECTED).should(
                  "exist"
                );
              }
            );
          }
        );
      }
    );
  });
});
