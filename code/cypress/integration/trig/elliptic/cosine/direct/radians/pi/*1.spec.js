import { LocatorConstants } from "../../../../../../../constants/locators";
import { ValueConstants } from "../../../../../../../constants/values";

describe("Trigonometric Function Keys - Cosine In Radians", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");

        cy.get(LocatorConstants.MEASUREMENT_DISPLAY).then(
          ($displayMeasureBeforeTogglingToRadians) => {
            cy.wrap($displayMeasureBeforeTogglingToRadians).should(
              "have.text",
              ""
            );
            cy.get(LocatorConstants.TOGGLE_MEASUREMENT_KEY).then(
              ($measurementDisplayTextBeforeTogglingToRadians) => {
                cy.wrap($measurementDisplayTextBeforeTogglingToRadians).should(
                  "have.text",
                  "Rad"
                );
                cy.get(LocatorConstants.TOGGLE_MEASUREMENT_KEY).click();
                cy.get(LocatorConstants.MEASUREMENT_DISPLAY).then(
                  ($displayMeasureAfterTogglingToRadians) => {
                    cy.wrap($displayMeasureAfterTogglingToRadians).should(
                      "have.text",
                      "Rad"
                    );
                    cy.get(LocatorConstants.TOGGLE_MEASUREMENT_KEY).then(
                      ($measurementDisplayTextAfterTogglingToRadians) => {
                        cy.wrap(
                          $measurementDisplayTextAfterTogglingToRadians
                        ).should("have.text", "Deg");
                      }
                    );
                  }
                );
              }
            );
          }
        );
      });
    });
  });

  it("PI In Radians Cosine Returns A Value Of -1", () => {
    cy.get(LocatorConstants.PI_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingPi) => {
        cy.wrap($displayAfterSelectingPi).should(
          "have.text",
          ValueConstants.PI
        );

        cy.get(LocatorConstants.COSINE_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingCosineOnPiMultipliedByTwo) => {
            cy.wrap($displayAfterSelectingCosineOnPiMultipliedByTwo).should(
              "have.text",
              "-1"
            );
          }
        );
      }
    );
  });
});
