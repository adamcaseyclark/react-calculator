import { CommonConstants } from "../../constants/common";
import { LocatorConstants } from "../../constants/locators";

describe("Keyboard Shortcuts Of Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it.skip("Shortcut Keys `shift + E` Enters Exponential Notation Format", () => {
    // SKIPPING TEST - SHIFT + LETTER / SYMBOL USED ELSE IN SHORTCUT NOT WORKING
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{E}");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingShiftPlusE) => {
        cy.wrap($displayAfterTypingShiftPlusE).should(
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
            'previous="" operator="" lastKey="EE" calculationInProgress="" audit="" shortcutKeys="EE"'
          );
        }
      );
    }
  });
});
