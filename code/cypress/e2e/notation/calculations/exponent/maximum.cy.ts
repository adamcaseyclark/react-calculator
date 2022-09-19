import { LocatorConstants } from "../../../../constants/locators";

describe("Exponential Notation Calculation (EE): Maximum", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("1 e 15 Will Display A Whole Number 1 With 15 Zeros", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering0e15) => {
        cy.wrap($displayAfterEntering0e15).should("have.text", "1 e 15");
        cy.get(LocatorConstants.EQUALS_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterEntering0e15) => {
            cy.wrap($displayAfterEntering0e15).should(
              "have.text",
              "1000000000000000"
            );
          }
        );
      }
    );
  });
});
