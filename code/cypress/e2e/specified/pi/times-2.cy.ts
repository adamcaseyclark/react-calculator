import { LocatorConstants } from "../../../constants/locators";
import { ValueConstants } from "../../../constants/values";

describe("PI key on Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Using Output Of Pi Key In A New Equation Using Pi", () => {
    cy.get(LocatorConstants.PI_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesBeforeEquals) => {
          cy.wrap($previouslyDisplayedValuesBeforeEquals).should(
            "have.text",
            'previous="3.141592653589793" operator="*" lastKey="2" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering2) => {
      // THE OUTPUT OF THE PI WAS SEEN AS NUMBERS AND ADDING THE 2 TO THE NUMBER STRING
      cy.wrap($displayAfterEntering2).should("have.text", "2");
    });

    cy.get(LocatorConstants.EQUALS_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterMultiplyingPiTimes2) => {
        // THE OUTPUT OF THE PI WAS SEEN AS NUMBERS AND ADDING THE 2 TO THE NUMBER STRING

        cy.wrap($displayAfterMultiplyingPiTimes2).should(
          "not.have.text",
          `${ValueConstants.PI}2`
        );
        cy.wrap($displayAfterMultiplyingPiTimes2).should(
          "have.text",
          "6.283185307179586"
        );
      }
    );
  });
});
