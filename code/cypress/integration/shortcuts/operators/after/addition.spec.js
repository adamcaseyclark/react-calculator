import { LocatorConstants } from "../../../../constants/locators";
import { OperationConstants } from "../../../../constants/operations";

describe("Keyboard Shortcuts Of Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");

        cy.get(LocatorConstants.ONE_KEY).click();
        cy.get(LocatorConstants.TWO_KEY).click();
        cy.get(LocatorConstants.THREE_KEY).click();

        cy.get(LocatorConstants.DOCUMENT_BODY).type(
          `{${OperationConstants.ADDITION}}`
        );
        cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterTyping123AdditionSign) => {
            assert.equal($displayAfterTyping123AdditionSign.text(), "123");
          }
        );

        // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
        // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
        if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
          cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
            ($previouslyDisplayedAfterTyping123AdditionSign) => {
              cy.wrap($previouslyDisplayedAfterTyping123AdditionSign).should(
                "have.text",
                'previous="" operator="+" lastKey="+" calculationInProgress="" audit="" shortcutKeys="+"'
              );
            }
          );
        }
      });
    });
  });

  it("Next Number After Confirms Operator Persists (Issue Found - Confirmation Test)", () => {
    cy.get(LocatorConstants.ONE_KEY).click();

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterTyping1AfterAddingAdditionWithShortcut) => {
          cy.wrap(
            $previouslyDisplayedAfterTyping1AfterAddingAdditionWithShortcut
          ).should(
            "have.text",
            'previous="123" operator="+" lastKey="1" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
