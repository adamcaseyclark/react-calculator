import { LocatorConstants } from "../../../../constants/locators";

describe("Number Keys Display Failure- No Preceding Zeros", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Consecutive Number Do Not Have a Preceding Zero", () => {
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayWithNoActivity) => {
      cy.wrap($displayWithNoActivity).should("have.text", "0");

      cy.get(LocatorConstants.ONE_KEY).click();
      cy.get(LocatorConstants.TWO_KEY).click();
      cy.get(LocatorConstants.THREE_KEY).click();

      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterEntering123) => {
          cy.wrap($displayAfterEntering123).should("not.have.text", "0123");
          cy.wrap($displayAfterEntering123).should("have.text", "123");
        }
      );
    });
  });
});
