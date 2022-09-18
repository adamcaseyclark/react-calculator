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

  it("New Digit Clears Display After PI Displayed, No Operator Selected", () => {
    cy.get(LocatorConstants.PI_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingPi) => {
        cy.wrap($displayAfterSelectingPi).should(
          "have.text",
          ValueConstants.PI
        );
      }
    );

    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingTwoAfterPi) => {
        // THE OUTPUT OF THE PI WAS SEEN AS NUMBERS AND ADDING THE 2 TO THE NUMBER STRING
        cy.wrap($displayAfterSelectingTwoAfterPi).should(
          "not.have.text",
          `${ValueConstants.PI}2`
        );

        cy.wrap($displayAfterSelectingTwoAfterPi).should("have.text", "2");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesBeforeEquals) => {
          cy.wrap($previouslyDisplayedValuesBeforeEquals).should(
            "have.text",
            'previous="" operator="" lastKey="2" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
