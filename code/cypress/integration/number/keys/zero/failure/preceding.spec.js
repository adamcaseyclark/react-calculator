import { LocatorConstants } from "../../../../../constants/locators";

describe("Zero Number Key Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Will Not Have Preceding Zero Before Other Numbers", () => {
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterZeroAnd3Sevens) => {
        cy.wrap($displayAfterZeroAnd3Sevens).should("have.text", "777");
        cy.wrap($displayAfterZeroAnd3Sevens).should("not.have.text", "0777");
      }
    );
  });
});
