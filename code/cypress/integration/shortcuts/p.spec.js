import { LocatorConstants } from "../../constants/locators";
import { ValueConstants } from "../../constants/values";

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

  it("Typing Letter 'p' Will Display PI To Display", () => {
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{p}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingLetterPForPi) => {
        cy.wrap($displayAfterTypingLetterPForPi).should(
          "have.text",
          ValueConstants.PI
        );
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTypingLetterE) => {
          cy.wrap($previouslyDisplayedValuesAfterTypingLetterE).should(
            "have.text",
            'previous="" operator="" lastKey="π" calculationInProgress="" audit="" shortcutKeys="p"'
          );
        }
      );
    }
  });
});
