import { CommonConstants } from "../../../../constants/common";
import { LocatorConstants } from "../../../../constants/locators";

describe("Exponential / Scientific Notation Functionality (EE)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("With No Input Will Return An Empty Notation (0 e 0)", () => {
    cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayWhenSelectingExponentialNotationOnZero) => {
        cy.wrap($displayWhenSelectingExponentialNotationOnZero).should(
          "have.text",
          CommonConstants.EMPTY_EXPONENTIAL_NOTATION
        );
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTypingComma) => {
          cy.wrap($previouslyDisplayedValuesAfterTypingComma).should(
            "have.text",
            'previous="" operator="" lastKey="EE" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
