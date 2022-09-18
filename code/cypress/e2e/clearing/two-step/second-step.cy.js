import { LocatorConstants } from "../../../constants/locators";
import { RegexConstants } from "../../../constants/regex";

describe("Clearing During Two Step Calculation - Second Step", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");

        cy.get(LocatorConstants.SEVEN_KEY).click();
        cy.get(LocatorConstants.SEVEN_KEY).click();
        cy.get(LocatorConstants.SEVEN_KEY).click();

        cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).click();
        cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y_WHEN_SELECTED).should(
          "exist"
        );

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterClearingAfterFirstStepOfCalculation) => {
            cy.wrap($displayAfterClearingAfterFirstStepOfCalculation).should(
              "have.text",
              "777"
            );
          }
        );
      });
    });
  });

  it("Behavior After Selecting Two Step, Keeps X Value In Memory", () => {
    cy.get(LocatorConstants.EIGHT_KEY).click();

    cy.get(LocatorConstants.CLEAR_KEY).then(
      ($clearKeyAtStartOfTestInSecondPartOfCalculation) => {
        cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).then(
          ($xToThePowerOfYKeyTextAtStartOfTestInSecondPartOfCalculation) => {
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAtStartOfTestInSecondPartOfCalculation) => {
                cy.wrap($clearKeyAtStartOfTestInSecondPartOfCalculation).should(
                  "have.text",
                  "C"
                );
                cy.wrap($clearKeyAtStartOfTestInSecondPartOfCalculation).should(
                  "not.have.text",
                  "AC"
                );

                cy.wrap(
                  $xToThePowerOfYKeyTextAtStartOfTestInSecondPartOfCalculation
                ).should("have.text", "xy");
                cy.get(
                  LocatorConstants.X_TO_THE_POWER_OF_Y_WHEN_SELECTED
                ).should("exist");
                cy.wrap($displayAtStartOfTestInSecondPartOfCalculation).should(
                  "have.text",
                  "8"
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
            'previous="777" operator="" lastKey="8" calculationInProgress="x^y" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT)
      .contains(RegexConstants.C_BUT_NOT_AC)
      .click();

    // SELECTED KEY REMAINS SELECTED, DISPLAY CLEARS
    cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y_WHEN_SELECTED).should("exist");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterClearingAfterClearingDuringSecondStep) => {
        cy.wrap($displayAfterClearingAfterClearingDuringSecondStep).should(
          "have.text",
          "0"
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
            'previous="777" operator="" lastKey="C" calculationInProgress="x^y" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
