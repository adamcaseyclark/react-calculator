import { LocatorConstants } from "../../../constants/locators";
import { TextConstants } from "../../../../src/constants/text";

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

  it("Typing 'shift' Plus '9' Chooses A Left Parenthesis", () => {
    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingBeforeTypingLeftParenthesis) => {
        assert.equal(
          $displayAfterTypingBeforeTypingLeftParenthesis.text(),
          "8"
        );
      }
    );

    cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedBeforeTypingLeftParenthesis) => {
          cy.wrap($previouslyDisplayedBeforeTypingLeftParenthesis).should(
            "have.text",
            'previous="" operator="+" lastKey="+" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.DOCUMENT_BODY).type(
      `{${TextConstants.LEFT_PARENTHESIS}}`
    );

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingLeftParenthesis) => {
        assert.equal($displayAfterTypingLeftParenthesis.text(), "8");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterTypingLeftParenthesis) => {
          cy.wrap($previouslyDisplayedAfterTypingLeftParenthesis).should(
            "have.text",
            'previous="8" operator="+" lastKey="(" calculationInProgress="" audit="8+(" shortcutKeys="("'
          );
        }
      );
    }
  });
});
