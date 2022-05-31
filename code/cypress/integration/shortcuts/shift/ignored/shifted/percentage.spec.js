import { CommonConstants } from "../../../../../constants/common";
import { LocatorConstants } from "../../../../../constants/locators";

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

  it("Shortcut Keys `shift + five` Displays Percentage", () => {
    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed) => {
        cy.wrap($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed).should(
          "have.text",
          "2nd"
        );
        cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
      }
    );

    // THIS REQUIRES SELECTING SHIFT KEY + E KEY
    cy.get(LocatorConstants.DOCUMENT_BODY).type(`{%}`);

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
