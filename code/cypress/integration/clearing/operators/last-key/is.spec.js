import { LocatorConstants } from "../../../../constants/locators";

describe("Keyboard Shortcuts Of Calculator - Operator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Clearing When Last Key IS An Operator - Clears Operator, Display Remains", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.SIX_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTyping123456Plus) => {
        assert.equal($displayAfterTyping123456Plus.text(), "123456");
      }
    );

    // LAST KEY IS AN OPERATOR
    cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesBeforeSelectingClearingKey) => {
          cy.wrap($previouslyDisplayedValuesBeforeSelectingClearingKey).should(
            "have.text",
            'previous="" operator="+" lastKey="+" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.CLEAR_KEY).then(
      ($clearKeyDisplayedTextAfterTypingAddition) => {
        cy.wrap($clearKeyDisplayedTextAfterTypingAddition).should(
          "not.have.text",
          "AC"
        );
        cy.wrap($clearKeyDisplayedTextAfterTypingAddition).should(
          "have.text",
          "C"
        );
      }
    );

    cy.get(LocatorConstants.CLEAR_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingClearingKey) => {
        assert.equal($displayAfterSelectingClearingKey.text(), "123456");
      }
    );

    cy.get(LocatorConstants.CLEAR_KEY).then(
      ($clearKeyDisplayedTextAfterSelectingClearingKey) => {
        cy.wrap($clearKeyDisplayedTextAfterSelectingClearingKey).should(
          "not.have.text",
          "C"
        );
        cy.wrap($clearKeyDisplayedTextAfterSelectingClearingKey).should(
          "have.text",
          "AC"
        );
      }
    );

    cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should("exist");

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterSelectingClearingKey) => {
          cy.wrap($previouslyDisplayedValuesAfterSelectingClearingKey).should(
            "have.text",
            'previous="" operator="" lastKey="C" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
