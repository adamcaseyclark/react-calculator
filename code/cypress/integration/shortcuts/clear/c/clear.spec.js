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

  it("Shortcut (c) Key With Previous, Operator, Current - Clears Display, Not Operator", () => {
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

    cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterTyping333) => {
      assert.equal($displayAfterTyping333.text(), "333");
    });

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesBeforeTypingKeyboardShortcutLetterC) => {
          cy.wrap(
            $previouslyDisplayedValuesBeforeTypingKeyboardShortcutLetterC
          ).should(
            "have.text",
            'previous="123456" operator="+" lastKey="3" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.CLEAR_KEY).then(
      ($clearKeyDisplayedTextAfterTyping333) => {
        cy.wrap($clearKeyDisplayedTextAfterTyping333).should(
          "not.have.text",
          "AC"
        );
        cy.wrap($clearKeyDisplayedTextAfterTyping333).should("have.text", "C");
      }
    );

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{c}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingKeyboardShortcutLetterC) => {
        assert.equal($displayAfterTypingKeyboardShortcutLetterC.text(), "0");
      }
    );

    cy.get(LocatorConstants.CLEAR_KEY).then(
      ($clearKeyDisplayedTextAfterTypingKeyboardShortcutLetterC) => {
        cy.wrap(
          $clearKeyDisplayedTextAfterTypingKeyboardShortcutLetterC
        ).should("not.have.text", "C");
        cy.wrap(
          $clearKeyDisplayedTextAfterTypingKeyboardShortcutLetterC
        ).should("have.text", "AC");
      }
    );

    cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTypingKeyboardShortcutLetterC) => {
          cy.wrap(
            $previouslyDisplayedValuesAfterTypingKeyboardShortcutLetterC
          ).should(
            "have.text",
            'previous="123456" operator="+" lastKey="C" calculationInProgress="" audit="" shortcutKeys="c"'
          );
        }
      );
    }
  });
});
