import { LocatorConstants } from "../../constants/locators";
import { NumberConstants } from "../../constants/numbers";
import { SinCosTanConstants } from "../../constants/sin-cos-tan";

describe("Standard Keyboard Layout Verification", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Fifth Row Of Standard Keyboard - 10 Keys", () => {
    cy.get(LocatorConstants.ALL_KEYS).then(($keys) => {
      cy.wrap($keys).each(($key, $index) => {
        if ($index === 40) cy.wrap($key).should("have.text", "Rad");
        if ($index === 41)
          cy.wrap($key).should("have.text", SinCosTanConstants.HYPERBOLIC_SINE);
        if ($index === 42)
          cy.wrap($key).should(
            "have.text",
            SinCosTanConstants.HYPERBOLIC_COSINE
          );
        if ($index === 43)
          cy.wrap($key).should(
            "have.text",
            SinCosTanConstants.HYPERBOLIC_TANGENT
          );
        if ($index === 44) cy.wrap($key).should("have.text", "π");
        if ($index === 45) cy.wrap($key).should("have.text", "Rand");
        if ($index === 46)
          cy.wrap($key).should("have.text", NumberConstants[0]);
        if ($index === 47) cy.wrap($key).should("have.text", ".");
        if ($index === 48) cy.wrap($key).should("have.text", "=");
      });
    });
  });
});
