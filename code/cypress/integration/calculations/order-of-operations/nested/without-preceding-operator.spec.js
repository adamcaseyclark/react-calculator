import { LocatorConstants } from "../../../../constants/locators";

describe("Order Of Operations - Nested", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Equation Does Not Have Preceding Operation To First Left Parenthesis (9+8*7+(8+9/9)) = 74", () => {
    cy.get(LocatorConstants.LEFT_PARENTHESIS_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();

    // (9+8*7+
    // 119?

    // cy.get(LocatorConstants.DISPLAYED_VALUE).then(
    //   ($displayAfterEnteringSecondLeftParenthesis) => {
    //     cy.wrap($displayAfterEnteringSecondLeftParenthesis).should(
    //       "have.text",
    //       "65"
    //     );
    //   }
    // );

    cy.get(LocatorConstants.LEFT_PARENTHESIS_KEY).click();
    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.DIVISION_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayBeforeEnteringFirstRightParenthesis) => {
        cy.wrap($displayBeforeEnteringFirstRightParenthesis).should(
          "have.text",
          "9"
        );
      }
    );

    cy.get(LocatorConstants.RIGHT_PARENTHESIS_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEnteringFirstRightParenthesis) => {
        cy.wrap($displayAfterEnteringFirstRightParenthesis).should(
          "have.text",
          "9"
        );
      }
    );

    cy.get(LocatorConstants.RIGHT_PARENTHESIS_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingSecondParenthesis) => {
        cy.wrap($displayAfterSelectingSecondParenthesis).should(
          "have.text",
          "74"
        );
      }
    );

    // TODO: (ADD) ADDITION KEY SELECTED AT THIS POINT

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterSecondParenthesis) => {
          cy.wrap($previouslyDisplayedValuesAfterSecondParenthesis).should(
            "have.text",
            'previous="" operator="" lastKey=")" calculationInProgress="" audit="(9+8*7+(8+9÷9))" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.EQUALS_KEY).click();
    // // ADDITION KEY SELECTED AT THIS POINT
    // // THIS IS ADDING 74 AND 9 - THIS IS THE CALCULATOR BEHAVIOR
    // // NOT SURE WHY - THE 9 IS THE LAST NUMBER ENTERED BEFORE `))`
    // cy.get(LocatorConstants.DISPLAYED_VALUE).then(
    //   ($displayAfterSelectingEquals) => {
    //     cy.wrap($displayAfterSelectingEquals).should("have.text", "83");
    //   }
    // );

    cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should("exist");

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterSecondParenthesis) => {
          cy.wrap($previouslyDisplayedValuesAfterSecondParenthesis).should(
            "have.text",
            'previous="" operator="" lastKey="=" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
