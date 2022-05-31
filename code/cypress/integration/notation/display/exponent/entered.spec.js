import { CommonConstants } from "../../../../constants/common";
import { LocatorConstants } from "../../../../constants/locators";

describe("Exponential / Scientific Notation: Exponent", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");

        cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayWhenSelectingExponentialNotationOnZero) => {
            cy.wrap($displayWhenSelectingExponentialNotationOnZero).should(
              "have.text",
              CommonConstants.EMPTY_EXPONENTIAL_NOTATION
            );
          }
        );
      });
    });
  });

  it("Entered Number After Entering Notation Becomes Exponent", () => {
    // TEST STARTS WITH EMPTY NOTATION DISPLAYED 0 e 0

    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayWhenAfterAdding555ToTheNotation) => {
        cy.wrap($displayWhenAfterAdding555ToTheNotation).should(
          "have.text",
          "0 e 555"
        );
      }
    );
  });
});
