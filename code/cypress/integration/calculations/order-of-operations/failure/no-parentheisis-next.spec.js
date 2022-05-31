import { LocatorConstants } from "../../../../constants/locators";

describe("Order Of Operations - Failure", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("No Number Next To Left Parenthesis Without Operator - Example 123(8", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering123) => {
        cy.wrap($displayAfterEntering123).should("have.text", "123");
      }
    );

    // THIS CLEARS THE DISPLAY FOR SOME INEXPLICABLE REASON
    cy.get(LocatorConstants.LEFT_PARENTHESIS_KEY).click();

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValues) => {
          cy.wrap($previouslyDisplayedValues).should(
            "have.text",
            'previous="" operator="" lastKey="(" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering8) => {
      cy.wrap($displayAfterEntering8).should("have.text", "8");
    });

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValues) => {
          cy.wrap($previouslyDisplayedValues).should(
            "have.text",
            'previous="" operator="" lastKey="8" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
