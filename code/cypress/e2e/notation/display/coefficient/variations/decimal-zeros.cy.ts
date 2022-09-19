import { CommonConstants } from "../../../../../constants/common";
import { LocatorConstants } from "../../../../../constants/locators";

describe("Exponential Notation (EE) Display - Coefficient", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Display When 0.00000 Is Coefficient Same As 0 As Coefficient", () => {
    cy.get(LocatorConstants.DECIMAL_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering1PointTwoE1) => {
        cy.wrap($displayAfterEntering1PointTwoE1).should(
          "have.text",
          "0.00000"
        );

        cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterEntering1PointTwoE1) => {
            cy.wrap($displayAfterEntering1PointTwoE1).should(
              "have.text",
              CommonConstants.EMPTY_EXPONENTIAL_NOTATION
            );
          }
        );
      }
    );
  });
});
