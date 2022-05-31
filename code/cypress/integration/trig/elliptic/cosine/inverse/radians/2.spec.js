import { LocatorConstants } from "../../../../../../constants/locators";
import { MessageConstants } from "../../../../../../constants/messages";

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

  it("2 Radians Returns Message To User - Not A Number", () => {
    cy.get(LocatorConstants.TWO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEnteringOne) => {
        cy.wrap($displayAfterEnteringOne).should("have.text", "2");

        cy.get(LocatorConstants.INVERSE_COSINE_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingInverseCosineOnOne) => {
            cy.wrap($displayAfterSelectingInverseCosineOnOne).should(
              "have.text",
              MessageConstants.NOT_A_NUMBER
            );
          }
        );
      }
    );
  });
});
