import { LocatorConstants } from "../../constants/locators";

describe("Equals Key Functionality - Common Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Equals Common Functionality - 1 + 1 = 2", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.ONE_KEY).click();

    cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");
    cy.get(LocatorConstants.EQUALS_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should("exist");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingEquals) => {
        cy.wrap($displayAfterSelectingEquals).should("have.text", "2");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterSelectingEquals) => {
          cy.wrap($previouslyDisplayedValuesAfterSelectingEquals).should(
            "have.text",
            'previous="1" operator="+" lastKey="=" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
