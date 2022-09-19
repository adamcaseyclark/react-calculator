import { LocatorConstants } from "../../../constants/locators";

describe("Cube", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Happy Path Calculation", () => {
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAdding27) => {
      cy.wrap($displayAfterAdding27).should("have.text", "27");
      cy.get(LocatorConstants.REMOVE_THE_INDEX_3_RADICAL).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterRemovingTheCubeRadical) => {
          cy.wrap($displayAfterRemovingTheCubeRadical).should("have.text", "3");
        }
      );
    });
  });
});
