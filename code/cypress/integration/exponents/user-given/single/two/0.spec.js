import { LocatorConstants } from "../../../../../constants/locators";

describe("2 Raised To The Displayed Number Key (User Given Exponent)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Entered 0 Will Yield An Answer Of 1", () => {
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.SHIFT_KEY).click();
    cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering1) => {
      cy.wrap($displayAfterEntering1).should("have.text", "0");

      cy.get(LocatorConstants.TWO_TO_THE_POWER_OF).click();

      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterRaising2ToThePowerOf0) => {
          cy.wrap($displayAfterRaising2ToThePowerOf0).should("have.text", "1");
        }
      );
    });
  });
});
