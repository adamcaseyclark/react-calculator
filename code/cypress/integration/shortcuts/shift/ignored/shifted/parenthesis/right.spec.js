import { CommonConstants } from "../../../../../../constants/common";
import { LocatorConstants } from "../../../../../../constants/locators";

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

  it("Right Parenthesis Shortcut Types ['Shift', '0']", () => {
    // VERIFYING NOT SHIFTED AT START OF TEST
    cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");

    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed) => {
        cy.wrap($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed).should(
          "have.text",
          "2ⁿᵈ"
        );
        cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
      }
    );

      // THIS REQUIRES SELECTING SHIFT KEY + 0 KEY
      // WHY IS THIS NOT `SHIFT + 0` OR JUST `RIGHT PARENTHESIS`?
      cy.get(LocatorConstants.DOCUMENT_BODY).type(
          `{shift}{${CommonConstants.LEFT_PARENTHESIS}}`
      );

    // CONFIRMING KEYBOARD REMAINS IN STANDARD LAYOUT
    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed) => {
        cy.wrap($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed).should(
          "have.text",
          "2ⁿᵈ"
        );
        cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
      }
    );
  });
});
