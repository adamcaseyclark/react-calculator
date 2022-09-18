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

  it("-2 Yields A Message To User - Not A Number", () => {
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.TOGGLE_POSITIVE_NEGATIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displaySelectingNegativeTwo) => {
        cy.wrap($displaySelectingNegativeTwo).should("have.text", "-2");
      }
    );

    cy.get(LocatorConstants.BASE_TWO_LOGARITHM_KEY).then(($log2KeyDisplay) => {
      cy.get(LocatorConstants.BASE_TWO_LOGARITHM_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingBase2OnNegative2) => {
          cy.wrap($log2KeyDisplay).should("have.text", LogConstants.LOG2);

          cy.wrap($displayAfterSelectingBase2OnNegative2).should(
            "have.text",
            MessageConstants.NOT_A_NUMBER
          );
        }
      );
    });
  });
});
