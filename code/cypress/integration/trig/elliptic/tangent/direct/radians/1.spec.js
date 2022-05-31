import { LocatorConstants } from "../../../../../../constants/locators";

describe("Trigonometric Function Keys - Tangent In Radians", () => {
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

  it("1 Radian Returns A Value Of 1.5574077246549023", () => {
    cy.get(LocatorConstants.ONE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering0) => {
      cy.wrap($displayAfterEntering0).should("have.text", "1");

      cy.get(LocatorConstants.TANGENT_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingTangentOn1) => {
          assert.match(
            $displayAfterSelectingTangentOn1.text(),
            /1\.557407724654902/
          );
        }
      );
    });
  });
});
