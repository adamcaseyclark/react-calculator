import { LocatorConstants } from "../../../../constants/locators";
import { OperationConstants } from "../../../../constants/operations";

describe("Division Operator Behavior - When Key Is Selected", () => {
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

  it("Addition Key Will Change Outline When Selected", () => {
    cy.get(LocatorConstants.DIVISION_KEY).then(
      ($shiftKeyAfterKeyHasBeenSelected) => {
        cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
          "have.text",
          OperationConstants.DIVISION
        );
        cy.get(LocatorConstants.DIVISION_KEY_NOT_SELECTED).should("exist");

        cy.get(LocatorConstants.DIVISION_KEY).click();
        cy.get(LocatorConstants.DIVISION_KEY).then(
          ($shiftKeyAfterKeyHasBeenSelected) => {
            cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
              "have.text",
              OperationConstants.DIVISION
            );
            cy.get(LocatorConstants.DIVISION_KEY_WHEN_SELECTED).should("exist");

            cy.get(LocatorConstants.ADDITION_KEY).click();
            cy.get(LocatorConstants.DIVISION_KEY).then(
              ($shiftKeyAfterKeyHasBeenSelected) => {
                cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
                  "have.text",
                  OperationConstants.DIVISION
                );
                cy.get(LocatorConstants.DIVISION_KEY_NOT_SELECTED).should(
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
