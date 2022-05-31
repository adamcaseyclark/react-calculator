import { LocatorConstants } from "../../../../../../constants/locators";

describe("Trigonometric Function Keys - Hyperbolic Cosine In Radians", () => {
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

  it("2 Radians Returns A Value Of 3.762195691083631", () => {
    cy.get(LocatorConstants.TWO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering2) => {
      cy.wrap($displayAfterEntering2).should("have.text", "2");

      cy.get(LocatorConstants.HYPERBOLIC_COSINE_KEY).click();

      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingHyperbolicCosineOn2) => {
          assert.match(
            $displayAfterSelectingHyperbolicCosineOn2.text(),
            /3\.762195691083631/
          );
        }
      );
    });
  });
});
