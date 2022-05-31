import { LocatorConstants } from "../../../constants/locators";
import { RegexConstants } from "../../../constants/regex";

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

  it("Alternating (C) And (ESC) - Last Key C and AC - Confirming Nothing Breaks", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.SIX_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTyping123456Plus) => {
        assert.equal($displayAfterTyping123456Plus.text(), "123456");
      }
    );

    cy.get(LocatorConstants.CLEAR_KEY).then(
      ($clearKeyDisplayedTextBeforeClearing) => {
        assert.match(
          $clearKeyDisplayedTextBeforeClearing.text(),
          RegexConstants.C_BUT_NOT_AC
        );
      }
    );

    cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{c}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingKeyboardShortcutLetterCOnC) => {
        assert.equal($displayAfterTypingKeyboardShortcutLetterCOnC.text(), "0");

        // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
        // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
        if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
          cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
            (
              $previouslyDisplayedValuesAfterTypingKeyboardShortcutLetterCOnC
            ) => {
              cy.wrap(
                $previouslyDisplayedValuesAfterTypingKeyboardShortcutLetterCOnC
              ).should(
                "have.text",
                'previous="" operator="" lastKey="C" calculationInProgress="" audit="" shortcutKeys="c"'
              );
            }
          );
        }
      }
    );

    cy.get(LocatorConstants.CLEAR_KEY).then(
      ($clearKeyDisplayedTextAfterClearingByTypingC) => {
        assert.match(
          $clearKeyDisplayedTextAfterClearingByTypingC.text(),
          RegexConstants.AC_BUT_NOT_C
        );
      }
    );

    cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{esc}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingKeyboardShortcutLetterEscOnAC) => {
        assert.equal(
          $displayAfterTypingKeyboardShortcutLetterEscOnAC.text(),
          "0"
        );

        // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
        // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
        if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
          cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
            (
              $previouslyDisplayedValuesAfterTypingKeyboardShortcutLetterEscOnAC
            ) => {
              cy.wrap(
                $previouslyDisplayedValuesAfterTypingKeyboardShortcutLetterEscOnAC
              ).should(
                "have.text",
                'previous="" operator="" lastKey="AC" calculationInProgress="" audit="" shortcutKeys="escape"'
              );
            }
          );
        }
      }
    );

    cy.get(LocatorConstants.CLEAR_KEY).then(
      ($clearKeyDisplayedTextAfterClearingByTypingEsc) => {
        assert.match(
          $clearKeyDisplayedTextAfterClearingByTypingEsc.text(),
          RegexConstants.AC_BUT_NOT_C
        );
      }
    );

    cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{c}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterClearingByTypingCAgainOnAC) => {
        assert.equal($displayAfterClearingByTypingCAgainOnAC.text(), "0");

        // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
        // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
        if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
          cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
            ($previouslyDisplayedValuesAfterClearingByTypingCAgainOnAC) => {
              cy.wrap(
                $previouslyDisplayedValuesAfterClearingByTypingCAgainOnAC
              ).should(
                "have.text",
                'previous="" operator="" lastKey="AC" calculationInProgress="" audit="" shortcutKeys="c"'
              );
            }
          );
        }
      }
    );
  });
});
