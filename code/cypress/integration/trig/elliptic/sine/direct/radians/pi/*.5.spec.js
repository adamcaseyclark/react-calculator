import { LocatorConstants } from "../../../../../../../constants/locators";
import { ValueConstants } from "../../../../../../../constants/values";

describe("Trigonometric Function Keys - Sine In Radians", () => {
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

  it("PI In Radians Divided By 2 Returns A Value Of 1", () => {
    cy.get(LocatorConstants.PI_KEY).click();
    cy.get(LocatorConstants.DIVISION_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.EQUALS_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingPiDividedByTwo) => {
        assert.equal(
          $displayAfterSelectingPiDividedByTwo.text(),
          ValueConstants.HALF_PI
        );

        cy.get(LocatorConstants.SINE_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingSineOnPiDividedByTwo) => {
            cy.wrap($displayAfterSelectingSineOnPiDividedByTwo).should(
              "have.text",
              "1"
            );
          }
        );
      }
    );
  });
});
