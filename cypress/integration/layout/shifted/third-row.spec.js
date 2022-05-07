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

  it("Third Row Of Standard Keyboard - 10 Keys", () => {
    cy.get(LocatorConstants.ALL_KEYS).then(($keys) => {
      cy.wrap($keys).each(($key, $index) => {
        if ($index === 20) cy.wrap($key).should("have.text", "1/x");
        if ($index === 21) cy.wrap($key).should("have.text", "√x");
        if ($index === 22) cy.wrap($key).should("have.text", "√x");
        if ($index === 23) cy.wrap($key).should("have.text", "√x");
        if ($index === 24) cy.wrap($key).should("have.text", "ln");
        if ($index === 25) cy.wrap($key).should("have.text", "log");
        if ($index === 26)
          cy.wrap($key).should("have.text", NumberConstants[4]);
        if ($index === 27)
          cy.wrap($key).should("have.text", NumberConstants[5]);
        if ($index === 28)
          cy.wrap($key).should("have.text", NumberConstants[6]);
        if ($index === 29) cy.wrap($key).should("have.text", OperationConstants.SUBTRACTION);
      });
    });
  });
});
