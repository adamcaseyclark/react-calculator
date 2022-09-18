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

  it("Equals After Selecting Addition Operator Yields 0", () => {
    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEnteringPlus) => {
        cy.wrap($displayAfterEnteringPlus).should("have.text", "0");
        cy.get(LocatorConstants.ADDITION_KEY).then(($additionKeyText) => {
          cy.wrap($additionKeyText).should("have.text", "+");

          cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");
          cy.get(LocatorConstants.EQUALS_KEY).click();
          cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should("exist");

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
              cy.wrap($displayAfterSelectingEqualsKey).should("have.text", "0");
            }
          );
        });
      }
    );
  });
});
