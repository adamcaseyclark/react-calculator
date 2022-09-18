import { LocatorConstants } from "../../../../constants/locators";

describe("Measurement In Degrees Display", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Default For Application Is Degrees", () => {
    cy.get(LocatorConstants.MEASUREMENT_DISPLAY).then(
      ($displayMeasureAsDefault) => {
        cy.wrap($displayMeasureAsDefault).should("have.text", "");
        cy.get(LocatorConstants.TOGGLE_MEASUREMENT_KEY).then(
          ($measurementDisplayText) => {
            cy.wrap($measurementDisplayText).should("have.text", "Rad");
          }
        );
      }
    );
  });
});
