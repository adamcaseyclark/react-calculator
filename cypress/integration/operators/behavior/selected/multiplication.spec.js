import { LocatorConstants } from "../../../../constants/locators";
import { OperationConstants } from "../../../../constants/operations";

describe("Multiplication Operator Behavior - When Key Is Selected", () => {
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

  it("Multiplication Key Will Change Outline When Selected", () => {
    cy.get(LocatorConstants.MULTIPLICATION_KEY).then(
      ($shiftKeyAfterKeyHasBeenSelected) => {
        cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
          "have.text",
          OperationConstants.MULTIPLICATION
        );
        cy.get(LocatorConstants.MULTIPLICATION_KEY_NOT_SELECTED).should("exist");

        cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
        cy.get(LocatorConstants.MULTIPLICATION_KEY).then(
          ($shiftKeyAfterKeyHasBeenSelected) => {
            cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
              "have.text",
              OperationConstants.MULTIPLICATION
            );
            cy.get(LocatorConstants.MULTIPLICATION_KEY_WHEN_SELECTED).should("exist");

            cy.get(LocatorConstants.DIVISION_KEY).click();
            cy.get(LocatorConstants.MULTIPLICATION_KEY).then(
              ($shiftKeyAfterKeyHasBeenSelected) => {
                cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
                  "have.text",
                  OperationConstants.MULTIPLICATION
                );
                cy.get(LocatorConstants.MULTIPLICATION_KEY_NOT_SELECTED).should(
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
