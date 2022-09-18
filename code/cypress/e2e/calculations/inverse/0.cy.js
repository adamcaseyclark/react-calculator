import { LocatorConstants } from "../../../constants/locators";
import { MessageConstants } from "../../../constants/messages";

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

  it("O Will Return Message To User Not A Number Message", () => {
    cy.get(LocatorConstants.INVERSE_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayWhenNoValueEnteredBeforeInverseSelected) => {
        cy.wrap($displayWhenNoValueEnteredBeforeInverseSelected).should(
          "have.text",
          MessageConstants.NOT_A_NUMBER
        );
      }
    );

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
