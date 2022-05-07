import { LocatorConstants } from "../../../../constants/locators";

describe("Exponential Notation (EE) Display - Exponent", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
      cy.wrap($displayAfterReload).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Exponents Cannot Be A Float Number", () => {
    cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering0e12) => {
        cy.wrap($displayAfterEntering0e12).should("have.text", "0 e 12");

        cy.get(LocatorConstants.DECIMAL_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingDecimalKey) => {
            cy.wrap($displayAfterEntering0e12).should("have.text", "0 e 12");
            cy.wrap($displayAfterEntering0e12).should(
              "not.have.text",
              "0 e 12."
            );
          }
        );
      }
    );
  });
});
