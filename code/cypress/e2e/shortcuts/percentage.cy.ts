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

  it("Percentage KeyBoard Shortcut Changes Displayed Number To A Percentage", () => {
    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterClickingOn9Twice) => {
        cy.wrap($displayAfterClickingOn9Twice).should("have.text", "99");
      }
    );

    // (SHIFT + 5) TO SELECT EXCLAMATION POINT (%)
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{%}");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterAfterTypingPercentageShortcutKey) => {
        cy.wrap($displayAfterAfterTypingPercentageShortcutKey).should(
          "have.text",
          "0.99"
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
            'previous="" operator="" lastKey="%" calculationInProgress="" audit="" shortcutKeys="%"'
          );
        }
      );
    }
  });
});
