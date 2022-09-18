import { LocatorConstants } from "../../../constants/locators";
import { MessageConstants } from "../../../constants/messages";

describe("Equals Key Functionality - Operator Only", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Equals After Selecting Multiplication Operator Yields 0", () => {
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEnteringMultiplication) => {
        cy.wrap($displayAfterEnteringMultiplication).should("have.text", "0");
        cy.get(LocatorConstants.MULTIPLICATION_KEY).then(
          ($multiplicationKeyText) => {
            cy.wrap($multiplicationKeyText).should("have.text", "*");

            cy.get(LocatorConstants.MULTIPLICATION_KEY_WHEN_SELECTED).should(
              "exist"
            );
            cy.get(LocatorConstants.EQUALS_KEY).click();
            cy.get(LocatorConstants.MULTIPLICATION_KEY_NOT_SELECTED).should(
              "exist"
            );

            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAfterSelectingEqualsKey) => {
                cy.wrap($displayAfterSelectingEqualsKey).should(
                  "not.have.text",
                  "NaN"
                );
                cy.wrap($displayAfterSelectingEqualsKey).should(
                  "not.have.text",
                  MessageConstants.NOT_A_NUMBER
                );
                cy.wrap($displayAfterSelectingEqualsKey).should(
                  "have.text",
                  "0"
                );
              }
            );
          }
        );
      }
    );
  });
});
