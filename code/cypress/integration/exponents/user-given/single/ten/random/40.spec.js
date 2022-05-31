import { LocatorConstants } from "../../../../../../constants/locators";

describe("10 Raised To The Displayed Number Key (User Given Exponent)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Number 40 Will Display Long Decimal A Exponential Notated Number", () => {
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering150) => {
        cy.wrap($displayAfterEntering150).should("have.text", "40");

        cy.get(LocatorConstants.TEN_TO_THE_POWER_OF).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingToThePowerOf10) => {
            cy.wrap($displayAfterSelectingToThePowerOf10).should(
              "have.text",
              "9.999999999999998e39"
            );
          }
        );
      }
    );
  });
});
