import { LocatorConstants } from "../../../constants/locators";
import { SinCosTanConstants } from "../../../constants/sin-cos-tan";
import { MemoryConstants } from "../../../constants/memory";
import { OperationConstants } from "../../../constants/operations";
import { NumberConstants } from "../../../constants/numbers";

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

  it("Forth Row Of Standard Keyboard - 10 Keys", () => {
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
