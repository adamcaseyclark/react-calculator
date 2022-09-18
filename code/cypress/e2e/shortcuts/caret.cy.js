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

  it("Caret Shortcut Types ['Shift', '6']", () => {
    cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y_NOT_SELECTED).should("exist");

    // THIS REQUIRES SELECTING SHIFT KEY + 6 KEY
    cy.get(LocatorConstants.DOCUMENT_BODY).type(`{^}`);
    cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y_WHEN_SELECTED).should("exist");
    cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTypingCaret) => {
          cy.wrap($previouslyDisplayedValuesAfterTypingCaret).should(
            "have.text",
            'previous="" operator="" lastKey="x^y" calculationInProgress="x^y" audit="" shortcutKeys="^"'
          );
        }
      );
    }
  });
});
