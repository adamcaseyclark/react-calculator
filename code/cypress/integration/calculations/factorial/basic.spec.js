import { LocatorConstants } from "../../../constants/locators";

describe("Factorial Key Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Basic Test - Testing Variables Displayed And No Unexpected Keys Selected Afterwards", () => {
    cy.get(LocatorConstants.FIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAdding5) => {
      cy.wrap($displayAfterAdding5).should("have.text", "5");

      cy.get(LocatorConstants.FACTORIAL_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterAfterSelectingFactorialKey) => {
          cy.wrap($displayAfterAfterSelectingFactorialKey).should(
            "have.text",
            "120"
          );
        }
      );

      cy.ConfirmationNoSelectedKeysArePresent();

      // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
      // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
      if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
        cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
          ($previouslyDisplayedAfterSelectingFactorialKey) => {
            cy.wrap($previouslyDisplayedAfterSelectingFactorialKey).should(
              "have.text",
              'previous="" operator="" lastKey="x!" calculationInProgress="" audit="" shortcutKeys=""'
            );
          }
        );
      }
    });
  });
});
