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

  it("Formatted Correctly When Input Is A 3 Digits", () => {
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering333) => {
        cy.wrap($displayAfterEntering333).should("have.text", "333");
        cy.get(LocatorConstants.PERCENTAGE_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterEntering333AndPercentageKey) => {
            cy.wrap($displayAfterEntering333AndPercentageKey).should(
              "have.text",
              "3.33"
            );
          }
        );
      }
    );
  });
});
