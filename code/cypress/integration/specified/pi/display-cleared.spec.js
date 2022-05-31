import { LocatorConstants } from "../../../constants/locators";
import { ValueConstants } from "../../../constants/values";

describe("PI key on Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Any Displayed Value Will Be Cleared When PI key Before Displaying By PI Value", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "123");
      cy.get(LocatorConstants.PI_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
        cy.wrap($display).should("have.text", ValueConstants.PI);
      });
    });
  });
});
