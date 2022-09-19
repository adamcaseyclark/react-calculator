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

  it("Addition Shortcut Types ['Shift', '=']", () => {
    // VERIFYING NOT SHIFTED AT START OF TEST
    cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");

    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterTyping123) => {
      cy.wrap($displayAfterTyping123).should("have.text", "123");
    });

    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed) => {
        cy.wrap($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed).should(
          "have.text",
          "2ⁿᵈ"
        );
        cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
      }
    );

    // THIS REQUIRES SELECTING SHIFT KEY + 8 KEY
    // WHY IS THIS NOT `SHIFT + EQUALS` OR JUST `ADDITION`?

    // THIS REQUIRES SELECTING SHIFT KEY + EQUALS KEY
    cy.get(LocatorConstants.DOCUMENT_BODY).type(
      `{shift}{${OperationConstants.ADDITION}}`
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
