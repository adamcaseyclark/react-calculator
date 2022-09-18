import { LocatorConstants } from "../../../constants/locators";

describe("Cubed key (x^3) on Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("0 Can Be Selected And Cubed, The Answer Is 0", () => {
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEnteringZero) => {
        cy.wrap($displayAfterEnteringZero).should("have.text", "0");
      }
    );

    // SIGNIFIES ZERO HAS BEEN ENTERED AS A NUMBER - DIFFERENT THAN DEFAULT ZERO
    cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
      cy.wrap($clearKeyDisplayedText).should("have.text", "C");
    });

    cy.get(LocatorConstants.CUBE_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterCubedEnteredZero) => {
        cy.wrap($displayAfterCubedEnteredZero).should("have.text", "0");
      }
    );
  });
});
