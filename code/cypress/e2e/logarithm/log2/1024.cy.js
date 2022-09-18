import { LocatorConstants } from "../../../constants/locators";
import { LogConstants } from "../../../constants/log";
import { MessageConstants } from "../../../constants/messages";

describe("log 2 Key on Calculator", () => {
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

  it("1024 Yields A The Number 10", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displaySelecting1024) => {
      cy.wrap($displaySelecting1024).should("have.text", "1024");
    });

    cy.get(LocatorConstants.BASE_TWO_LOGARITHM_KEY).then(($log2KeyDisplay) => {
      cy.get(LocatorConstants.BASE_TWO_LOGARITHM_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingBase2On1024) => {
          cy.wrap($log2KeyDisplay).should("have.text", LogConstants.LOG2);

          cy.wrap($displayAfterSelectingBase2On1024).should("have.text", "10");
        }
      );
    });
  });
});
