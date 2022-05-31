import { LocatorConstants } from "../../../../../constants/locators";
import { ValueConstants } from "../../../../../constants/values";

describe("Eulers Number (e) Raised To The User Given Exponent", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Euler's Number Raised To The User's Input (1)", () => {
    cy.get(LocatorConstants.ONE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering1) => {
      cy.wrap($displayAfterEntering1).should("have.text", "1");
      cy.get(LocatorConstants.E_TO_THE_POWER_OF).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterRaisingEToThE0Power) => {
          cy.wrap($displayAfterRaisingEToThE0Power).should(
            "have.text",
            ValueConstants.EULERS
          );
        }
      );
    });
  });
});
