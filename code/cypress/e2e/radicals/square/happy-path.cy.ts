import { LocatorConstants } from "../../../constants/locators";

describe("Square", () => {
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
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.SIX_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAdding16) => {
      cy.wrap($displayAfterAdding16).should("have.text", "16");
      cy.get(LocatorConstants.REMOVE_THE_INDEX_2_RADICAL).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterRemovingTheCubeRadical) => {
          cy.wrap($displayAfterRemovingTheCubeRadical).should("have.text", "4");
        }
      );
    });
  });
});
