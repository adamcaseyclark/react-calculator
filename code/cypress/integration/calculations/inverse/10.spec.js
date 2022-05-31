import { LocatorConstants } from "../../../constants/locators";

describe("Inverse Key (1/x) Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Selecting The Inverse Key On A Decimal Will Return A Whole Number Representation Of Inverse", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAddingTen) => {
      cy.wrap($displayAfterAddingTen).should("have.text", "10");
      cy.get(LocatorConstants.INVERSE_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingInverseOnZeroPointTwoFive) => {
          cy.wrap($displayAfterSelectingInverseOnZeroPointTwoFive).should(
            "have.text",
            "0.1"
          );
        }
      );
    });

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterSelectingInverseKey) => {
          cy.wrap($previouslyDisplayedValuesAfterSelectingInverseKey).should(
            "have.text",
            'previous="" operator="" lastKey="1/x" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
