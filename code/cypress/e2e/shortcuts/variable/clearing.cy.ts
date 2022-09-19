import { LocatorConstants } from "../../../constants/locators";

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

  it("Any Pressed Key Will Key Clear Shortcut Key Variable", () => {
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{9}");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTyping9OnKeyboard) => {
        cy.wrap($displayAfterTyping9OnKeyboard).should("have.text", "9");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterSelectingNine) => {
          cy.wrap($previouslyDisplayedAfterSelectingNine).should(
            "have.text",
            'previous="" operator="" lastKey="9" calculationInProgress="" audit="" shortcutKeys="9"'
          );
        }
      );
    }

    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterClickingOn9Once) => {
        cy.wrap($displayAfterClickingOn9Once).should("have.text", "98");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterSelectingFactorialKey) => {
          cy.wrap($previouslyDisplayedAfterSelectingFactorialKey).should(
            "have.text",
            'previous="" operator="" lastKey="8" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
