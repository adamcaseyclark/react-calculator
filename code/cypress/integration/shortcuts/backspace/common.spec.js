import { LocatorConstants } from "../../../constants/locators";

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

  it("Common Functionality Of Backspace Keyboard Shortcut", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.SIX_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTyping123456) => {
        assert.equal($displayAfterTyping123456.text(), "123456");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTying123456) => {
          cy.wrap($previouslyDisplayedValuesAfterTying123456).should(
            "have.text",
            'previous="" operator="" lastKey="6" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{backspace}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingBackspaceKeyOnceOn123456) => {
        assert.equal(
          $displayAfterTypingBackspaceKeyOnceOn123456.text(),
          "12345"
        );
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterSelectingBackspaceRemoving6) => {
          cy.wrap(
            $previouslyDisplayedValuesAfterSelectingBackspaceRemoving6
          ).should(
            "have.text",
            'previous="" operator="" lastKey="5" calculationInProgress="" audit="" shortcutKeys="backspace"'
          );
        }
      );
    }

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{backspace}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingBackspaceKeyTwiceOn123456) => {
        assert.equal(
          $displayAfterTypingBackspaceKeyTwiceOn123456.text(),
          "1234"
        );
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterSelectingBackspaceRemoving5) => {
          cy.wrap(
            $previouslyDisplayedValuesAfterSelectingBackspaceRemoving5
          ).should(
            "have.text",
            'previous="" operator="" lastKey="4" calculationInProgress="" audit="" shortcutKeys="backspace"'
          );
        }
      );
    }
  });
});
