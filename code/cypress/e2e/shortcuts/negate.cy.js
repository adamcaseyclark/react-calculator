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

  it.skip("Negate Displayed Value Using Shortcut Keys", () => {
    // SKIPPING TEST - SHIFT + LETTER / SYMBOL USED ELSE IN SHORTCUT NOT WORKING

    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{shift}{-}");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterAfterTypingShortcutToNegateADisplayedValue) => {
        cy.wrap($displayAfterAfterTypingShortcutToNegateADisplayedValue).should(
          "have.text",
          "-1"
        );
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterSelectingFactorialKey) => {
          cy.wrap($previouslyDisplayedAfterSelectingFactorialKey).should(
            "have.text",
            'previous="" operator="" lastKey="" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
