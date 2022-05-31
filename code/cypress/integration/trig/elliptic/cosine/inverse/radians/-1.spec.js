import { LocatorConstants } from "../../../../../../constants/locators";

describe("Trigonometric Function Keys - Inverse Cosine In Radians", () => {
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

          cy.get(LocatorConstants.MEASUREMENT_DISPLAY).then(
            ($displayMeasureBeforeTogglingToRadians) => {
              cy.wrap($displayMeasureBeforeTogglingToRadians).should(
                "have.text",
                ""
              );
              cy.get(LocatorConstants.TOGGLE_MEASUREMENT_KEY).then(
                ($measurementDisplayTextBeforeTogglingToRadians) => {
                  cy.wrap(
                    $measurementDisplayTextBeforeTogglingToRadians
                  ).should("have.text", "Rad");
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
  });

  it("-1 Radians Returns A Value Of 3.141592653589793", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TOGGLE_POSITIVE_NEGATIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEnteringOne) => {
        cy.wrap($displayAfterEnteringOne).should("have.text", "-1");

        cy.get(LocatorConstants.INVERSE_COSINE_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingInverseCosineOnOne) => {
            cy.wrap($displayAfterSelectingInverseCosineOnOne).should(
              "have.text",
              "3.141592653589793"
            );
          }
        );
      }
    );
  });
});
