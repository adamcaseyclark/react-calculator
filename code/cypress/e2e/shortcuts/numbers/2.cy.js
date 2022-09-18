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

  it("Typing 2 Inserts A Number 2 To The Display", () => {
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{2}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterTypingTwo) => {
      cy.wrap($displayAfterTypingTwo).should("have.text", "2");
    });

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTypingTwo) => {
          cy.wrap($previouslyDisplayedValuesAfterTypingTwo).should(
            "have.text",
            'previous="" operator="" lastKey="2" calculationInProgress="" audit="" shortcutKeys="2"'
          );
        }
      );
    }
  });
});
