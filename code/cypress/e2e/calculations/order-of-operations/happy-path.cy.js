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

  it("Calc Respects Order Of Ops, Parenthesis 8 * (9 + 5 * 5) = 272", () => {
    //TODO: VERIFY NO ADDING BEFORE LAST PARENTHESIS

    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
    cy.get(LocatorConstants.LEFT_PARENTHESIS_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesBeforeRightParenthesis) => {
          cy.wrap($previouslyDisplayedValuesBeforeRightParenthesis).should(
            "have.text",
            'previous="77" operator="*" lastKey="5" calculationInProgress="" audit="8*(9+5*5" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.RIGHT_PARENTHESIS_KEY).click();
    // TOTAL IS FROM WHAT IS IN THE PARENTHESIS
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($previouslyDisplayedValuesBeforeLeftParenthesis) => {
        cy.wrap($previouslyDisplayedValuesBeforeLeftParenthesis).should(
          "not.have.text",
          "272"
        );

        cy.wrap($previouslyDisplayedValuesBeforeLeftParenthesis).should(
          "not.have.text",
          "70"
        );

        cy.wrap($previouslyDisplayedValuesBeforeLeftParenthesis).should(
          "have.text",
          "34"
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
            'previous="" operator="*" lastKey=")" calculationInProgress="" audit="8*(9+5*5)" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.EQUALS_KEY).click();
    // TOTAL IS FROM WHAT IS IN THE PARENTHESIS
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($previouslyDisplayedValuesBeforeLeftParenthesis) => {
        cy.wrap($previouslyDisplayedValuesBeforeLeftParenthesis).should(
          "not.have.text",
          "97"
        );

        cy.wrap($previouslyDisplayedValuesBeforeLeftParenthesis).should(
          "not.have.text",
          "560"
        );

        cy.wrap($previouslyDisplayedValuesBeforeLeftParenthesis).should(
          "have.text",
          "272"
        );
      }
    );
  });
});
