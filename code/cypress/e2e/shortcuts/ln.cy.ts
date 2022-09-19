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

  it.skip("Shortcut Keys `e` Gives Back The Natural Log Of The Displayed Number", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelecting10BeforeTypingTheShortcutOfE) => {
        cy.wrap($displayAfterSelecting10BeforeTypingTheShortcutOfE).should(
          "have.text",
          "10"
        );
      }
    );

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{e}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterTypingE) => {
      cy.wrap($displayAfterTypingE).should("have.text", "2.302585092994046");
    });

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTypingComma) => {
          cy.wrap($previouslyDisplayedValuesAfterTypingComma).should(
            "have.text",
            'previous="" operator="" lastKey="" calculationInProgress="" audit="" shortcutKeys="e"'
          );
        }
      );
    }
  });
});
