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

  it("Equation 6/(4+2)8 Yields .75 (Will Take Operator From Previous => 6/8)", () => {
    //TODO: VERIFY DISPLAY IS NOT ADDING BEFORE LAST PARENTHESIS

    cy.get(LocatorConstants.SIX_KEY).click();
    cy.get(LocatorConstants.DIVISION_KEY).click();

    cy.get(LocatorConstants.DIVISION_KEY_WHEN_SELECTED).should("exist");

    cy.get(LocatorConstants.LEFT_PARENTHESIS_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");

    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.RIGHT_PARENTHESIS_KEY).click();

    // WILL HIGHLIGHT OPERATOR FROM PREVIOUS EQUATION - SHOWING WHAT WILL BE INHERITED
    cy.get(LocatorConstants.DIVISION_KEY_WHEN_SELECTED).should("exist");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($previouslyDisplayedValuesBeforeLeftParenthesis) => {
        cy.wrap($previouslyDisplayedValuesBeforeLeftParenthesis).should(
          "have.text",
          "6"
        );
      }
    );

    cy.get(LocatorConstants.EIGHT_KEY).click();

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesBeforeEquals) => {
          cy.wrap($previouslyDisplayedValuesBeforeEquals).should(
            "have.text",
            'previous="" operator="÷" lastKey="8" calculationInProgress="" audit="6÷(4+2)8" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayedBeforeEquals) => {
      cy.wrap($displayedBeforeEquals).should("have.text", "8");
    });

    cy.get(LocatorConstants.EQUALS_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayedValueAfterEquals) => {
        cy.wrap($displayedValueAfterEquals).should("not.have.text", "1");
        cy.wrap($displayedValueAfterEquals).should("not.have.text", "8");
        cy.wrap($displayedValueAfterEquals).should("have.text", "0.75");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesBeforeEquals) => {
          cy.wrap($previouslyDisplayedValuesBeforeEquals).should(
            "have.text",
            'previous="" operator="" lastKey="=" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
