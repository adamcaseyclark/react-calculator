import { LocatorConstants } from "../../../constants/locators";
import { CommonConstants } from "../../../constants/common";
import { LogConstants } from "../../../constants/log";
import { NumberConstants } from "../../../constants/numbers";
import { OperationConstants } from "../../../constants/operations";
import { RadicalConstants } from "../../../constants/radicals";

describe("Shifted View Keyboard Layout Verification", () => {
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

  it("Third Row Of Shifted View Keyboard - 10 Keys", () => {
    cy.get(LocatorConstants.ALL_KEYS).then(($keys) => {
      cy.wrap($keys).each(($key, $index) => {
        if ($index === 20) cy.wrap($key).should("have.text", CommonConstants.INVERSE);
        if ($index === 21)
          cy.wrap($key).should("have.text", RadicalConstants.SQUARE_ROOT);
        if ($index === 22)
          cy.wrap($key).should("have.text", RadicalConstants.CUBE_ROOT);
        if ($index === 23) cy.wrap($key).should("have.text", RadicalConstants.NTH_ROOT);
        if ($index === 24)
          cy.wrap($key).should(
            "have.text",
            LogConstants.LOG_TO_THE_USERS_INPUT
          );
        if ($index === 25) cy.wrap($key).should("have.text", LogConstants.LOG2);
        if ($index === 26)
          cy.wrap($key).should("have.text", NumberConstants[4]);
        if ($index === 27)
          cy.wrap($key).should("have.text", NumberConstants[5]);
        if ($index === 28)
          cy.wrap($key).should("have.text", NumberConstants[6]);
        if ($index === 29)
          cy.wrap($key).should("have.text", OperationConstants.SUBTRACTION);
      });
    });
  });
});
