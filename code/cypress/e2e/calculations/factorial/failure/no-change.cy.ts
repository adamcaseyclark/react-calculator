import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Factorial Key Functionality (x!)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it('When Not A Number Message Is Displayed - Selecting Factorial Key Will Not Break"', () => {
    cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterDisplayingNotANumberMessage) => {
        cy.wrap($displayAfterDisplayingNotANumberMessage).should(
          "have.text",
          MessageConstants.NOT_A_NUMBER
        );
      }
    );

    cy.get(LocatorConstants.FACTORIAL_KEY).click();

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

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterAfterSelectingFactorialKey) => {
        cy.wrap($displayAfterAfterSelectingFactorialKey).should(
          "have.text",
          MessageConstants.NOT_A_NUMBER
        );
      }
    );
  });
});
