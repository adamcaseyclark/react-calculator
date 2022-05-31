import { LocatorConstants } from "../../../constants/locators";

describe("Exponential Notation Calculation (EE): Calculations", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Calculating `1.2 e 5` Into 120000", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.DECIMAL_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering1Point2e5) => {
        cy.wrap($displayAfterEntering1Point2e5).should("have.text", "1.2 e 5");

        cy.get(LocatorConstants.EQUALS_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterResolving1Point2e5) => {
            cy.wrap($displayAfterResolving1Point2e5).should(
              "have.text",
              "120000"
            );
          }
        );
      }
    );
  });
});
