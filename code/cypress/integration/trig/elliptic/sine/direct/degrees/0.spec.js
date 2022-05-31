import { LocatorConstants } from "../../../../../../constants/locators";

describe("Trigonometric Function Keys - Sine In Degrees", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");

        cy.get(LocatorConstants.MEASUREMENT_DISPLAY).then(
          ($displayMeasureConfirmingUsingDegrees) => {
            cy.wrap($displayMeasureConfirmingUsingDegrees).should(
              "have.text",
              ""
            );
          }
        );
      });
    });
  });

  it("0 Degrees Returns A Value Of 0", () => {
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering0) => {
      cy.wrap($displayAfterEntering0).should("have.text", "0");

      cy.get(LocatorConstants.SINE_KEY).click();

      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingSineOn0) => {
          cy.wrap($displayAfterSelectingSineOn0).should("have.text", "0");
        }
      );
    });
  });
});
