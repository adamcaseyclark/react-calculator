import { LocatorConstants } from "../../../constants/locators";
import { RegexConstants } from "../../../constants/regex";

describe("Clearing During Two Step Calculation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("First Step - Behavior After Selecting X Raised To The Y Key", () => {
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();

    cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyAfterAdding777) => {
      cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).then(
        ($xToThePowerOfYKeyTextAfterAdding777) => {
          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterAdding777) => {
              cy.wrap($clearKeyAfterAdding777).should("have.text", "C");
              cy.wrap($clearKeyAfterAdding777).should("not.have.text", "AC");
              cy.wrap($xToThePowerOfYKeyTextAfterAdding777).should(
                "have.text",
                "xy"
              );
              cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y_NOT_SELECTED).should(
                "exist"
              );
              cy.wrap($displayAfterAdding777).should("have.text", "777");
            }
          );
        }
      );
    });

    cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).click();
    cy.get(LocatorConstants.CLEAR_KEY).then(
      ($clearKeyAfterSelectingXToThePowerOfY) => {
        cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).then(
          ($xToThePowerOfYKeyTextAfterSelectingXToThePowerOfY) => {
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAfterSelectingXToThePowerOfY) => {
                cy.wrap($clearKeyAfterSelectingXToThePowerOfY).should(
                  "have.text",
                  "C"
                );
                cy.wrap($clearKeyAfterSelectingXToThePowerOfY).should(
                  "not.have.text",
                  "AC"
                );
                cy.wrap(
                  $xToThePowerOfYKeyTextAfterSelectingXToThePowerOfY
                ).should("have.text", "xy");
                cy.get(
                  LocatorConstants.X_TO_THE_POWER_OF_Y_WHEN_SELECTED
                ).should("exist");
                cy.wrap($displayAfterSelectingXToThePowerOfY).should(
                  "have.text",
                  "777"
                );
              }
            );
          }
        );
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterSelectingXToYKey) => {
          cy.wrap($previouslyDisplayedValuesAfterSelectingXToYKey).should(
            "have.text",
            'previous="" operator="" lastKey="x^y" calculationInProgress="x^y" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT)
      .contains(RegexConstants.C_BUT_NOT_AC)
      .click();

    // SELECTED KEY IS NOT SELECTED, DISPLAY REMAINS
    cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y_NOT_SELECTED).should("exist");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterClearingAfterFirstStepOfCalculation) => {
        cy.wrap($displayAfterClearingAfterFirstStepOfCalculation).should(
          "have.text",
          "777"
        );
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTypingZero) => {
          cy.wrap($previouslyDisplayedValuesAfterTypingZero).should(
            "have.text",
            'previous="" operator="" lastKey="C" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
