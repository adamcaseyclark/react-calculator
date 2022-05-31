import { LocatorConstants } from "../../../../constants/locators";

describe("Keyboard Shortcuts Of Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Numbers Then An Operator - Backspace Will Not Delete Number Nor Delete Operator", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTyping123Plus) => {
        assert.equal($displayAfterTyping123Plus.text(), "123");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTying123Plus) => {
          cy.wrap($previouslyDisplayedValuesAfterTying123Plus).should(
            "have.text",
            'previous="" operator="+" lastKey="+" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{backspace}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingBackspaceKeyOnceOn123Plus) => {
        assert.equal(
          $displayAfterTypingBackspaceKeyOnceOn123Plus.text(),
          "123"
        );
        cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTypingBackspaceKeyOnceOn123Plus) => {
          cy.wrap(
            $previouslyDisplayedValuesAfterTypingBackspaceKeyOnceOn123Plus
          ).should(
            "have.text",
            'previous="" operator="+" lastKey="+" calculationInProgress="" audit="" shortcutKeys="backspace"'
          );
        }
      );
    }
  });
});
