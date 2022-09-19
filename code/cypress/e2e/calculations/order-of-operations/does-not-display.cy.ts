import { LocatorConstants } from "../../../constants/locators";

describe("Order Of Operations - Parentheses", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Parentheses do not show up in the display, 8*(9) Equals 72", () => {
    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
    cy.get(LocatorConstants.LEFT_PARENTHESIS_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($previouslyDisplayedValuesAfterLeftParenthesis) => {
        cy.wrap($previouslyDisplayedValuesAfterLeftParenthesis).should(
          "not.have.text",
          "("
        );

        cy.wrap($previouslyDisplayedValuesAfterLeftParenthesis).should(
          "not.have.text",
          "*"
        );

        cy.wrap($previouslyDisplayedValuesAfterLeftParenthesis).should(
          "have.text",
          "8"
        );
      }
    );

    cy.get(LocatorConstants.NINE_KEY).click();
    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesBeforeRightParenthesis) => {
          cy.wrap($previouslyDisplayedValuesBeforeRightParenthesis).should(
            "have.text",
            'previous="8" operator="*" lastKey="9" calculationInProgress="" audit="8*(9" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.RIGHT_PARENTHESIS_KEY).click();
    // TOTAL IS FROM WHAT IS IN THE PARENTHESIS
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($previouslyDisplayedValuesAfterRightParenthesis) => {
        cy.wrap($previouslyDisplayedValuesAfterRightParenthesis).should(
          "not.have.text",
          "("
        );

        cy.wrap($previouslyDisplayedValuesAfterRightParenthesis).should(
          "have.text",
          "9"
        );
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValues) => {
          cy.wrap($previouslyDisplayedValues).should(
            "have.text",
            'previous="" operator="*" lastKey=")" calculationInProgress="" audit="8*(9)" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.EQUALS_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEqualsIsSelected) => {
        cy.wrap($displayAfterEqualsIsSelected).should("have.text", "72");
      }
    );
  });
});
