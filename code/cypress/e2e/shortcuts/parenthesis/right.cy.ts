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

  it("Typing 'shift' Plus '0' Chooses A Right Parenthesis", () => {
    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
    cy.get(LocatorConstants.LEFT_PARENTHESIS_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingBeforeTypingRightParenthesis) => {
        assert.equal(
          $displayAfterTypingBeforeTypingRightParenthesis.text(),
          "3"
        );
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedBeforeTypingRightParenthesis) => {
          cy.wrap($previouslyDisplayedBeforeTypingRightParenthesis).should(
            "have.text",
            'previous="72" operator="+" lastKey="3" calculationInProgress="" audit="8*(9+3" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.DOCUMENT_BODY).type(
      `{${TextConstants.RIGHT_PARENTHESIS}}`
    );

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingRightParenthesis) => {
        assert.equal($displayAfterTypingRightParenthesis.text(), "12");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterTypingRightParenthesis) => {
          cy.wrap($previouslyDisplayedAfterTypingRightParenthesis).should(
            "have.text",
            'previous="" operator="*" lastKey=")" calculationInProgress="" audit="8*(9+3)" shortcutKeys=")"'
          );
        }
      );
    }
  });
});
