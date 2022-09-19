import { LocatorConstants } from "../../../../constants/locators";

describe("Zero Number Key Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Selecting Zero Key Displays 0 And Registers 'New' Zero, Not Default '0' - AC Becomes C", () => {
    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValues) => {
          cy.wrap($previouslyDisplayedValues).should(
            "have.text",
            'previous="" operator="" lastKey="" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterZeroSelected) => {
        cy.get(LocatorConstants.CLEAR_KEY).then(
          ($clearKeyAfterZeroSelected) => {
            cy.wrap($displayAfterZeroSelected).should("have.text", "0");
            cy.wrap($clearKeyAfterZeroSelected).should("have.text", "C");
            cy.wrap($clearKeyAfterZeroSelected).should("not.have.text", "AC");

            // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
            // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
            if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
              cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
                ($previouslyDisplayedValues) => {
                  cy.wrap($previouslyDisplayedValues).should(
                    "have.text",
                    'previous="" operator="" lastKey="0" calculationInProgress="" audit="" shortcutKeys=""'
                  );
                }
              );
            }
          }
        );
      }
    );
  });
});
