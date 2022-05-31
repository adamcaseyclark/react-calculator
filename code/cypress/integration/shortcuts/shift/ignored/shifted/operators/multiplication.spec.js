import { LocatorConstants } from "../../../../../../constants/locators";
import { OperationConstants } from "../../../../../../constants/operations";

describe("Keyboard Shortcuts Of Calculator, Layout Does Not Shift", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Multiplication Shortcut Types ['Shift', '8']", () => {
    // VERIFYING NOT SHIFTED AT START OF TEST
    cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");

    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed) => {
        cy.wrap($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed).should(
          "have.text",
          "2nd"
        );
        cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
      }
    );

    // THIS REQUIRES SELECTING SHIFT KEY + 8 KEY
    // WHY IS THIS NOT `SHIFT + 8` OR JUST `MULTIPLICATION`?
    cy.get(LocatorConstants.DOCUMENT_BODY).type(
      `{shift}{${OperationConstants.MULTIPLICATION}}`
    );

    // CONFIRMING KEYBOARD REMAINS IN STANDARD LAYOUT
    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyAfterKeyboardShortcutIncludingShiftKeyHasBeenTyped) => {
        cy.wrap(
          $shiftKeyAfterKeyboardShortcutIncludingShiftKeyHasBeenTyped
        ).should("have.text", "2nd");
        cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
      }
    );
  });
});
