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

  it("Equals After Selecting Division Operator Yields Not A Number Message", () => {
    cy.get(LocatorConstants.DIVISION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEnteringDivision) => {
        cy.wrap($displayAfterEnteringDivision).should("have.text", "0");
        cy.get(LocatorConstants.DIVISION_KEY).then(($divisionKeyText) => {
          cy.wrap($divisionKeyText).should("have.text", "÷");

          cy.get(LocatorConstants.DIVISION_KEY_WHEN_SELECTED).should("exist");
          cy.get(LocatorConstants.EQUALS_KEY).click();
          cy.get(LocatorConstants.DIVISION_KEY_NOT_SELECTED).should("exist");

          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterSelectingEqualsKey) => {
              cy.wrap($displayAfterSelectingEqualsKey).should(
                "not.have.text",
                "NaN"
              );
              cy.wrap($displayAfterSelectingEqualsKey).should(
                "not.have.text",
                "0"
              );
              cy.wrap($displayAfterSelectingEqualsKey).should(
                "have.text",
                MessageConstants.NOT_A_NUMBER
              );
            }
          );
        });
      }
    );
  });
});
