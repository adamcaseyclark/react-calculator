import { ExponentsConstants } from "../../../constants/exponents";
import { LocatorConstants } from "../../../constants/locators";
import { NumberConstants } from "../../../constants/numbers";
import { OperationConstants } from "../../../constants/operations";

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
              "2nd"
            );
            cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");
          }
        );
      });
    });
  });

  it("Second Row Of Shifted View Keyboard - 10 Keys", () => {
    cy.get(LocatorConstants.ALL_KEYS).then(($keys) => {
      cy.wrap($keys).each(($key, $index) => {
        if ($index === 10) cy.wrap($key).should("have.text", "2nd");
        if ($index === 11)
          cy.wrap($key).should("have.text", ExponentsConstants.SQUARED);
        if ($index === 12)
          cy.wrap($key).should("have.text", ExponentsConstants.CUBED);
        if ($index === 13) cy.wrap($key).should("have.text", "xy");
        if ($index === 14) cy.wrap($key).should("have.text", "yx");
        if ($index === 15)
          cy.wrap($key).should(
            "have.text",
            ExponentsConstants.TWO_RAISED_TO_THE_USERS_INPUT
          );
        if ($index === 16)
          cy.wrap($key).should("have.text", NumberConstants[7]);
        if ($index === 17)
          cy.wrap($key).should("have.text", NumberConstants[8]);
        if ($index === 18)
          cy.wrap($key).should("have.text", NumberConstants[9]);
        if ($index === 19)
          cy.wrap($key).should("have.text", OperationConstants.MULTIPLICATION);
      });
    });
  });
});
