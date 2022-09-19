import { CommonConstants } from "../../../../../constants/common";
import { LocatorConstants } from "../../../../../constants/locators";

describe("Exponential Notation (EE) Calculation - Positive Exponent", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Calculate When Coefficient And Exponent Are Both Zero, Will Return 0", () => {
    cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingExpNotationOnZero) => {
        cy.wrap($displayAfterSelectingExpNotationOnZero).should(
          "have.text",
          CommonConstants.EMPTY_EXPONENTIAL_NOTATION
        );

        cy.get(LocatorConstants.EQUALS_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterCalculating) => {
            cy.wrap($displayAfterCalculating).should("have.text", "0");
          }
        );
      }
    );
  });
});
