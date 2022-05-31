import { LocatorConstants } from "../../../constants/locators";
import { NumberConstants } from "../../../constants/numbers";
import { OperationConstants } from "../../../constants/operations";
import { SinCosTanConstants } from "../../../constants/sin-cos-tan";

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

  it("Forth Row Of Shifted View Keyboard - 10 Keys", () => {
    cy.get(LocatorConstants.ALL_KEYS).then(($keys) => {
      cy.wrap($keys).each(($key, $index) => {
        if ($index === 30) cy.wrap($key).should("have.text", "x!");
        if ($index === 31)
          cy.wrap($key).should("have.text", SinCosTanConstants.INVERSE_SINE);
        if ($index === 32)
          cy.wrap($key).should("have.text", SinCosTanConstants.INVERSE_COSINE);
        if ($index === 33)
          cy.wrap($key).should("have.text", SinCosTanConstants.INVERSE_TANGENT);
        if ($index === 34) cy.wrap($key).should("have.text", "e");
        if ($index === 35) cy.wrap($key).should("have.text", "EE");
        if ($index === 36)
          cy.wrap($key).should("have.text", NumberConstants[1]);
        if ($index === 37)
          cy.wrap($key).should("have.text", NumberConstants[2]);
        if ($index === 38)
          cy.wrap($key).should("have.text", NumberConstants[3]);
        if ($index === 39)
          cy.wrap($key).should("have.text", OperationConstants.ADDITION);
      });
    });
  });
});
