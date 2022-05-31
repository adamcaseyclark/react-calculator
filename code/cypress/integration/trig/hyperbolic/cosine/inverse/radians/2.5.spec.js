import { LocatorConstants } from "../../../../../../constants/locators";

describe("Trigonometric Function Keys - Hyperbole Inverse Cosine In Radians", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");

        cy.get(LocatorConstants.SHIFT_KEY).click();
        cy.get(LocatorConstants.SHIFT_KEY).then(($shiftKeyAfterSelecting) => {
          cy.wrap($shiftKeyAfterSelecting).should("have.text", "2nd");
          cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");
        });

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

  it("2.5 Radians Returns A Value Of 1.566799236972411", () => {
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.DECIMAL_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEnteringTwoPointFive) => {
        cy.wrap($displayAfterEnteringTwoPointFive).should("have.text", "2.5");

        cy.get(LocatorConstants.INVERSE_HYPERBOLIC_COSINE_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingInverseHyperbolicCosine) => {
            assert.match(
              $displayAfterSelectingInverseHyperbolicCosine.text(),
              /1\.566799236972411/
            );
          }
        );
      }
    );
  });
});
