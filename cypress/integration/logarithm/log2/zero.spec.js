import { LocatorConstants } from "../../../constants/locators";
import { MessageConstants } from "../../../constants/messages";
import { LogConstants } from "../../../constants/log";

describe("log 2 Key on Calculator - Zero Yields Not A Number", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.reload();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
      cy.wrap($displayAfterReload).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
        cy.get(LocatorConstants.SHIFT_KEY).click();
        cy.get(LocatorConstants.SHIFT_KEY).then(
          ($shiftKeyAfterKeyHasBeenSelected) => {
            cy.wrap($shiftKeyAfterKeyHasBeenSelected).should(
              "have.text",
              "2nd"
            );
            cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");
          }
        );
      });
    });
  });

  it("Selecting log 2 With No Value To Calculate Will Yield Not A Number Display", () => {
    cy.get(LocatorConstants.BASE_TWO_LOGARITHM_KEY).then(($log2KeyDisplay) => {
      cy.get(LocatorConstants.BASE_TWO_LOGARITHM_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingBase2On0) => {
          cy.wrap($log2KeyDisplay).should("have.text", LogConstants.LOG2);

          cy.wrap($displayAfterSelectingBase2On0).should(
            "have.text",
            MessageConstants.NOT_A_NUMBER
          );
        }
      );
    });
  });
});
