import { LocatorConstants } from "../../../../constants/locators";
import { LogConstants } from "../../../../constants/log";

describe("log 2 Key on Calculator - Three", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
        cy.get(LocatorConstants.SHIFT_KEY).click();
        cy.get(LocatorConstants.SHIFT_KEY).then(
          ($shiftKeyAfterKeyHasBeenSelected) => {
            cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
              "have.text",
              "2ⁿᵈ"
            );
            cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");
          }
        );
      });
    });
  });

  it("Using Log2 Will Not Unshift The Keyboard To Standard", () => {
    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyBeforeLog2KeyHasBeenSelected) => {
        cy.get(LocatorConstants.BASE_TWO_LOGARITHM_KEY).then(
          ($log2KeyDisplayBeforeSelectingLog2) => {
            cy.wrap($shiftKeyBeforeLog2KeyHasBeenSelected).should(
              "have.text",
              "2ⁿᵈ"
            );
            cy.wrap($log2KeyDisplayBeforeSelectingLog2).should(
              "have.text",
              "log₂"
            );
            cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");
            cy.get(LocatorConstants.BASE_TWO_LOGARITHM_KEY).click();
            cy.get(LocatorConstants.SHIFT_KEY).then(
              ($shiftKeyAfterLog2KeyHasBeenSelected) => {
                cy.get(LocatorConstants.BASE_TWO_LOGARITHM_KEY).then(
                  ($log2KeyDisplayAfterSelectingLog2) => {
                    cy.wrap($shiftKeyAfterLog2KeyHasBeenSelected).should(
                      "have.text",
                      "2ⁿᵈ"
                    );
                    cy.wrap($log2KeyDisplayAfterSelectingLog2).should(
                      "have.text",
                      "log₂"
                    );
                    cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should(
                      "exist"
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});
