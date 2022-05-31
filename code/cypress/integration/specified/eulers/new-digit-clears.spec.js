import { LocatorConstants } from "../../../constants/locators";
import { ValueConstants } from "../../../constants/values";

describe("Euler Key Display (e)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("New Digit Clears Display After PI Displayed, No Operator Selected", () => {
    cy.get(LocatorConstants.E_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingEulers) => {
        cy.wrap($displayAfterSelectingEulers).should(
          "have.text",
          ValueConstants.EULERS
        );
      }
    );

    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingTwoAfterEulers) => {
        // THE OUTPUT OF THE PI WAS SEEN AS NUMBERS AND ADDING THE 2 TO THE NUMBER STRING
        cy.wrap($displayAfterSelectingTwoAfterEulers).should(
          "not.have.text",
          `${ValueConstants.EULERS}2`
        );

        cy.wrap($displayAfterSelectingTwoAfterEulers).should("have.text", "2");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfter2) => {
          cy.wrap($previouslyDisplayedValuesAfter2).should(
            "have.text",
            'previous="" operator="" lastKey="2" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
