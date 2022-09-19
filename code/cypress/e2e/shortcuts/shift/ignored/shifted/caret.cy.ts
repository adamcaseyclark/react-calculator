import { LocatorConstants } from "../../../../../constants/locators";

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

  it("Caret Shortcut Types ['Shift', '6']", () => {
    // VERIFYING SHIFT KEY NOT SELECTED AT BEGINNING OF TEST
    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed) => {
        cy.wrap($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed).should(
          "have.text",
          "2ⁿᵈ"
        );
        cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
      }
    );

    // THIS REQUIRES SELECTING SHIFT KEY + 6 KEY
    cy.get(LocatorConstants.DOCUMENT_BODY).type(`{^}`);

    // CONFIRMING KEYBOARD REMAINS IN STANDARD LAYOUT
    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyAfterKeyboardShortcutIncludingShiftKeyHasBeenTyped) => {
        cy.wrap(
          $shiftKeyAfterKeyboardShortcutIncludingShiftKeyHasBeenTyped
        ).should("have.text", "2ⁿᵈ");
        cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTypingLetterE) => {
          cy.wrap($previouslyDisplayedValuesAfterTypingLetterE).should(
            "have.text",
            'previous="" operator="" lastKey="x^y" calculationInProgress="x^y" audit="" shortcutKeys="^"'
          );
        }
      );
    }
  });
});
