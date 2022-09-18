import { LocatorConstants } from "../../../constants/locators";

describe("Equals Key Functionality - Failure", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Numbers Remain In Display Before", () => {
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering44444) => {
        cy.wrap($displayAfterEntering44444).should("have.text", "44444");

        cy.get(LocatorConstants.EQUALS_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingEqualsKey) => {
            cy.wrap($displayAfterSelectingEqualsKey).should(
              "have.text",
              "44444"
            );
          }
        );
      }
    );
  });
});
