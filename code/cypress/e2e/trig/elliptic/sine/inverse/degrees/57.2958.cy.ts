import { LocatorConstants } from "../../../../../../constants/locators";
import { ValueConstants } from "../../../../../../constants/values";

describe("Trigonometric Function Keys - Inverse Sine In Degrees", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
        cy.get(LocatorConstants.SHIFT_KEY).click();
        cy.get(LocatorConstants.SHIFT_KEY).then(($shiftKeyAfterSelecting) => {
          cy.wrap($shiftKeyAfterSelecting).should("have.text", "2ⁿᵈ");
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

  it("57.2958 Degrees Returns A Value Of 1.57079632679489(7|66)", () => {
    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.DECIMAL_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.EIGHT_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering57Point2958) => {
        cy.wrap($displayAfterEntering57Point2958).should(
          "have.text",
          "57.2958"
        );

        cy.get(LocatorConstants.INVERSE_SINE_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingInverseSineOn57Point2958) => {
            assert.match(
              $displayAfterSelectingInverseSineOn57Point2958.text(),
              /1\.57079632679489(7|66)/
            );

            assert.equal(
              $displayAfterSelectingInverseSineOn57Point2958.text(),
              ValueConstants.HALF_PI
            );
          }
        );
      }
    );
  });
});
