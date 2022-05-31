import { LocatorConstants } from "../../../constants/locators";

describe("Nine Number Key Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Selecting The Nine Key Will Display A 9", () => {
    cy.get(LocatorConstants.NINE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering9) => {
      cy.wrap($displayAfterEntering9).should("have.text", "9");
    });
  });
});
