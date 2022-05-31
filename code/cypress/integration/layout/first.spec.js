import { LocatorConstants } from "../../constants/locators";
import { MemoryConstants } from "../../constants/memory";
import { OperationConstants } from "../../constants/operations";

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

  it("First Row Of Standard Keyboard - 10 Keys", () => {
    cy.get(LocatorConstants.ALL_KEYS).then(($keys) => {
      cy.wrap($keys).each(($key, $index) => {
        if ($index === 0) cy.wrap($key).should("have.text", "(");
        if ($index === 1) cy.wrap($key).should("have.text", ")");
        if ($index === 2) cy.wrap($key).should("have.text", MemoryConstants.MC);
        if ($index === 3)
          cy.wrap($key).should("have.text", MemoryConstants.PLUS);
        if ($index === 4)
          cy.wrap($key).should("have.text", MemoryConstants.MINUS);
        if ($index === 5) cy.wrap($key).should("have.text", MemoryConstants.MR);
        if ($index === 6) cy.wrap($key).should("have.text", "AC");
        if ($index === 7) cy.wrap($key).should("have.text", "+/-");
        if ($index === 8) cy.wrap($key).should("have.text", "%");
        if ($index === 9)
          cy.wrap($key).should("have.text", OperationConstants.DIVISION);
      });
    });
  });
});
