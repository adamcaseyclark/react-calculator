import { LocatorConstants } from "../../../../constants/locators";
import { OperationConstants } from "../../../../constants/operations";

describe("Addition Operator Behavior - When Key Is Selected", () => {
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
    cy.get(LocatorConstants.ADDITION_KEY).then(
      ($shiftKeyAfterKeyHasBeenSelected) => {
        cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
          "have.text",
          OperationConstants.ADDITION
        );
        cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should("exist");

        cy.get(LocatorConstants.ADDITION_KEY).click();
        cy.get(LocatorConstants.ADDITION_KEY).then(
          ($shiftKeyAfterKeyHasBeenSelected) => {
            cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
              "have.text",
              OperationConstants.ADDITION
            );
            cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");

            cy.get(LocatorConstants.SUBTRACTION_KEY).click();
            cy.get(LocatorConstants.ADDITION_KEY).then(
              ($shiftKeyAfterKeyHasBeenSelected) => {
                cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
                  "have.text",
                  OperationConstants.ADDITION
                );
                cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should(
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
