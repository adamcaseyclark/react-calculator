import { LocatorConstants } from "../../../constants/locators";
import { MessageConstants } from "../../../constants/messages";

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

  it("1 e -15 Should Calculate Into 0.000000000000001 - Not 1e-15 Or Not A Number", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.TOGGLE_POSITIVE_NEGATIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelecting1eNegative15) => {
        cy.wrap($displayAfterSelecting1eNegative15).should(
          "have.text",
          "1 e -15"
        );

        cy.get(LocatorConstants.EQUALS_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterResolving1eNegative15) => {
            cy.wrap($displayAfterResolving1eNegative15).should(
              "not.have.text",
              "1e-15"
            );

            cy.wrap($displayAfterResolving1eNegative15).should(
              "not.have.text",
              MessageConstants.NOT_A_NUMBER
            );

            cy.wrap($displayAfterResolving1eNegative15).should(
              "have.text",
              "0.000000000000001"
            );
          }
        );
      }
    );
  });
});
