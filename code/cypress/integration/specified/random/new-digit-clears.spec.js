import { LocatorConstants } from "../../../constants/locators";

let randomNumberGenerated;

describe("Random Key Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("New Digit Clears Display After PI Displayed, No Operator Selected", () => {
    cy.get(LocatorConstants.RANDOM_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingRandom) => {
        randomNumberGenerated = $displayAfterSelectingRandom.text();
        assert.isAbove(Number($displayAfterSelectingRandom.text()), 0);
        assert.isBelow(Number($displayAfterSelectingRandom.text()), 1);

        cy.get(LocatorConstants.TWO_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingTwoAfterSelectingRandom) => {
            // THE OUTPUT OF RAND NUMBER WAS SEEN AS NUMBERS AND ADDING THE 2 TO THE NUMBER STRING
            cy.wrap($displayAfterSelectingTwoAfterSelectingRandom).should(
              "not.have.text",
              `${randomNumberGenerated}2`
            );

            cy.wrap($displayAfterSelectingTwoAfterSelectingRandom).should(
              "have.text",
              "2"
            );
          }
        );
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfter2) => {
          cy.wrap($previouslyDisplayedValuesAfter2).should(
            "have.text",
            'previous="" operator="" lastKey="2" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
