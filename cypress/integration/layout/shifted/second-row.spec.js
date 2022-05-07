import { LocatorConstants } from "../../../constants/locators";
import { SinCosTanConstants } from "../../../constants/sin-cos-tan";
import { MemoryConstants } from "../../../constants/memory";
import { OperationConstants } from "../../../constants/operations";
import { NumberConstants } from "../../../constants/numbers";
import { RadicalConstants } from "../../../constants/radicals";

describe("Standard Keyboard Layout Verification", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.reload();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
      cy.wrap($displayAfterReload).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Second Row Of Standard Keyboard - 10 Keys", () => {
    cy.get(LocatorConstants.ALL_KEYS).then(($keys) => {
      cy.wrap($keys).each(($key, $index) => {
        if ($index === 10) cy.wrap($key).should("have.text", "2nd");
        if ($index === 11)
          cy.wrap($key).should("have.text", RadicalConstants.SQUARED);
        if ($index === 12)
          cy.wrap($key).should("have.text", RadicalConstants.CUBED);
        if ($index === 13) cy.wrap($key).should("have.text", "x^y");
        if ($index === 14)
          cy.wrap($key).should(
            "have.text",
            RadicalConstants.E_RAISED_TO_THE_USERS_INPUT
          );
        if ($index === 15)
          cy.wrap($key).should(
            "have.text",
            RadicalConstants.TEN_RAISED_TO_THE_USERS_INPUT
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
