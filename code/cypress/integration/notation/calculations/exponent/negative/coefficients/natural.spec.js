import { LocatorConstants } from "../../../../../../constants/locators";

describe("Exponential Notation (EE) Calculation - Negative Exponent", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Calculate When Coefficient Is A Natural Number", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TOGGLE_POSITIVE_NEGATIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering1eNeg1) => {
        cy.wrap($displayAfterEntering1eNeg1).should("have.text", "1 e -1");

        cy.get(LocatorConstants.EQUALS_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterCalculating) => {
            cy.wrap($displayAfterCalculating).should("have.text", "0.1");
          }
        );
      }
    );
  });
});
