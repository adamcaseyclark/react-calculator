import { LocatorConstants } from "../../../constants/locators";

describe("Clearing Display Functionality - C / AC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Default Display is `0` And The Clear Key Has AC", () => {
    // NO DATA ENTERED INTO CALCULATOR

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayWithNoDataEnteredIntoCalculator) => {
        cy.wrap($displayWithNoDataEnteredIntoCalculator).should(
          "have.text",
          "0"
        );
        cy.get(LocatorConstants.CLEAR_KEY).then(
          ($clearKeyDisplayedTextWithNoDataEnteredIntoCalculator) => {
            cy.wrap(
              $clearKeyDisplayedTextWithNoDataEnteredIntoCalculator
            ).should("have.text", "AC");

            cy.wrap(
              $clearKeyDisplayedTextWithNoDataEnteredIntoCalculator
            ).should("not.have.text", "C");
          }
        );
      }
    );
  });
});
