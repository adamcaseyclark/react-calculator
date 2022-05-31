import { LocatorConstants } from "../../constants/locators";

describe("Percentage Key Functionality - Float Number", () => {
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
    cy.get(LocatorConstants.DECIMAL_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEnteringPoint33) => {
        cy.wrap($displayAfterEnteringPoint33).should("have.text", "0.33");
        cy.get(LocatorConstants.PERCENTAGE_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingPercentageOfPoint33) => {
            cy.wrap($displayAfterSelectingPercentageOfPoint33).should(
              "have.text",
              "0.0033"
            );
          }
        );
      }
    );
  });
});
