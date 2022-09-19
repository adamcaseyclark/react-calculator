import { LocatorConstants } from "../../../../constants/locators";

describe("Order Of Operations - Parentheses - Nested", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("8*(10+8*2*(10*2+6÷3)) Yields 2,896", () => {
    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
    cy.get(LocatorConstants.LEFT_PARENTHESIS_KEY).click();

    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();

    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
    cy.get(LocatorConstants.LEFT_PARENTHESIS_KEY).click();

    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.SIX_KEY).click();
    cy.get(LocatorConstants.DIVISION_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.RIGHT_PARENTHESIS_KEY).click();
    cy.get(LocatorConstants.RIGHT_PARENTHESIS_KEY).click();

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterSecondRightParenthesis) => {
          cy.wrap($previouslyDisplayedValuesAfterSecondRightParenthesis).should(
            "have.text",
            'previous="" operator="*" lastKey=")" calculationInProgress="" audit="8*(10+8*2*(10*2+6÷3))" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.MULTIPLICATION_KEY_WHEN_SELECTED).should("exist");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($previouslyDisplayedValuesAfterSecondParenthesis) => {
        cy.wrap($previouslyDisplayedValuesAfterSecondParenthesis).should(
          "have.text",
          "362"
        );
      }
    );

    cy.get(LocatorConstants.EQUALS_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($previouslyDisplayedValuesBeforeLeftParenthesis) => {
        cy.wrap($previouslyDisplayedValuesBeforeLeftParenthesis).should(
          "have.text",
          "2896"
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
            'previous="" operator="" lastKey="=" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
