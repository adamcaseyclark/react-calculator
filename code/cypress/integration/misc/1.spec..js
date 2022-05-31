import { LocatorConstants } from "../../constants/locators";

describe("Miscellaneous Calculations #1", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("6, +, 6, =, +, 3, = displays 15", () => {
    cy.get(LocatorConstants.SIX_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.SIX_KEY).click();
    cy.get(LocatorConstants.EQUALS_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.EQUALS_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfter6Plus6EqualsPlus3Equals) => {
        cy.wrap($displayAfter6Plus6EqualsPlus3Equals).should("have.text", "15");
      }
    );
  });
});
