import { LocatorConstants } from "../../../constants/locators";

describe("Clearing After Adding Numbers Only - No Operator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Single Click Changes Key To AC and Clears Display To 0", () => {
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering333) => {
        cy.wrap($displayAfterEntering333).should("have.text", "333");
        cy.get(LocatorConstants.CLEAR_KEY).then(
          ($clearKeyDisplayedTextAfterEntering333) => {
            cy.wrap($clearKeyDisplayedTextAfterEntering333).should(
              "have.text",
              "C"
            );

            cy.wrap($clearKeyDisplayedTextAfterEntering333).should(
              "not.have.text",
              "AC"
            );

            // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
            // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
            if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
              cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
                ($previouslyDisplayedValuesBeforeSelectingClearingKey) => {
                  cy.wrap(
                    $previouslyDisplayedValuesBeforeSelectingClearingKey
                  ).should(
                    "have.text",
                    'previous="" operator="" lastKey="3" calculationInProgress="" audit="" shortcutKeys=""'
                  );
                }
              );
            }

            cy.get(LocatorConstants.CLEAR_KEY).click();
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAfterSelectingClearOnce) => {
                cy.get(LocatorConstants.CLEAR_KEY).then(
                  ($clearKeyDisplayedTextAfterSelectingClearOnce) => {
                    cy.wrap(
                      $clearKeyDisplayedTextAfterSelectingClearOnce
                    ).should("have.text", "AC");

                    cy.wrap(
                      $clearKeyDisplayedTextAfterSelectingClearOnce
                    ).should("not.have.text", "C");

                    cy.wrap($displayAfterSelectingClearOnce).should(
                      "have.text",
                      "0"
                    );

                    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
                    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
                    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
                      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
                        (
                          $previouslyDisplayedValuesAfterSelectingClearingKey
                        ) => {
                          cy.wrap(
                            $previouslyDisplayedValuesAfterSelectingClearingKey
                          ).should(
                            "have.text",
                            'previous="" operator="" lastKey="C" calculationInProgress="" audit="" shortcutKeys=""'
                          );
                        }
                      );
                    }
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});
