import { LocatorConstants } from "../../constants/locators";

describe("Percentage Key Functionality - Not Displaying Unnecessary 0", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Float Numbers Are Converted To Percentages", () => {
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering20) => {
      cy.wrap($displayAfterEntering20).should("have.text", "20");
      cy.get(LocatorConstants.PERCENTAGE_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingPercentageKey) => {
          cy.wrap($displayAfterSelectingPercentageKey).should(
            "have.text",
            "0.2"
          );
          cy.wrap($displayAfterSelectingPercentageKey).should(
            "not.have.text",
            "0.20"
          );
        }
      );
    });
  });
});
