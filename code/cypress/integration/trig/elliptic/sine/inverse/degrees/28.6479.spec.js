import { LocatorConstants } from "../../../../../../constants/locators";

describe("Trigonometric Function Keys - Inverse Sine In Degrees", () => {
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

          // NO MEASUREMENT DISPLAY IS PRESENT - INDICATING DEGREES IS EXPECTED
          cy.get(LocatorConstants.MEASUREMENT_DISPLAY).then(
            ($displayMeasureBeforeTogglingToRadians) => {
              cy.wrap($displayMeasureBeforeTogglingToRadians).should(
                "have.text",
                ""
              );
            }
          );
        });
      });
    });
  });

  it("28.6479 Degrees Returns A Value Of 0.5235987755982989", () => {
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.DECIMAL_KEY).click();
    cy.get(LocatorConstants.SIX_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering28Point6479Degrees) => {
        cy.wrap($displayAfterEntering28Point6479Degrees).should(
          "have.text",
          "28.6479"
        );

        cy.get(LocatorConstants.INVERSE_SINE_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingInverseSineOn28Point6479Degrees) => {
            assert.match(
              $displayAfterSelectingInverseSineOn28Point6479Degrees.text(),
              /0\.52359877559829(9|89)/
            );
          }
        );
      }
    );
  });
});
