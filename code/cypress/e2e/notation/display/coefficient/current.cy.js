import { LocatorConstants } from "../../../../constants/locators";

describe("Exponential / Scientific Notation Functionality (EE)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Current Displayed Value Becomes Coefficient At Time Of Selecting Notation, Exponent Is Zero", () => {
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering22) => {
      cy.wrap($displayAfterEntering22).should("have.text", "22");
      cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayWhenSelectingExponentialNotationOn22) => {
          cy.wrap($displayWhenSelectingExponentialNotationOn22).should(
            "have.text",
            "22 e 0"
          );
        }
      );
    });
  });
});
