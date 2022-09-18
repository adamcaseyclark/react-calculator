import { LocatorConstants } from "../../constants/locators";

describe("Percentage Key Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Formatted Correctly When Input Is A Single Digit", () => {
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering4) => {
      cy.wrap($displayAfterEntering4).should("have.text", "4");
      cy.get(LocatorConstants.PERCENTAGE_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterEntering4AndPercentageKey) => {
          cy.wrap($displayAfterEntering4AndPercentageKey).should(
            "have.text",
            "0.04"
          );
        }
      );
    });
  });
});
