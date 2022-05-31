import { CommonConstants } from "../../../../../../constants/common";
import { LocatorConstants } from "../../../../../../constants/locators";

describe("Keyboard Shortcuts Of Calculator, Layout Does Not Shift", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Left Parenthesis Shortcut Types ['Shift', '9']", () => {
    // VERIFYING NOT SHIFTED AT START OF TEST
    cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");

    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterEnteringOneMultiply) => {
          cy.wrap($previouslyDisplayedAfterEnteringOneMultiply).should(
            "have.text",
            'previous="" operator="*" lastKey="*" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed) => {
        cy.wrap($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed).should(
          "have.text",
          "2nd"
        );
        cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
      }
    );

    // THIS REQUIRES SELECTING SHIFT KEY + 9 KEY
    // WHY IS THIS NOT `SHIFT + 9` OR JUST `LEFT PARENTHESIS`?
    cy.get(LocatorConstants.DOCUMENT_BODY).type(
      `{shift}{${CommonConstants.LEFT_PARENTHESIS}}`
    );

    // CONFIRMING KEYBOARD REMAINS IN STANDARD LAYOUT
    // WAS SKIPPING THIS CODE BLOCK WHEN IT WAS BELOW CONDITION BELOW
    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyAfterShiftKeyboardKeyHasBeenPressed) => {
        cy.wrap($shiftKeyAfterShiftKeyboardKeyHasBeenPressed).should(
          "have.text",
          "2nd"
        );
        cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterTypingLeftParenthesis) => {
          cy.wrap($previouslyDisplayedAfterTypingLeftParenthesis).should(
            "have.text",
            'previous="1" operator="*" lastKey="(" calculationInProgress="" audit="1*(" shortcutKeys="("'
          );
        }
      );
    }
  });
});
