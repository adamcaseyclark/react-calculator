import { LocatorConstants } from "../../../../../../constants/locators";
import { MessageConstants } from "../../../../../../constants/messages";

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

  it("114.592 Degrees Returns Message To User - Not A Number", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.DECIMAL_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering114Point592) => {
        cy.wrap($displayAfterEntering114Point592).should(
          "have.text",
          "114.592"
        );

        cy.get(LocatorConstants.INVERSE_SINE_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingInverseSineOn114Point592) => {
            assert.equal(
              $displayAfterSelectingInverseSineOn114Point592.text(),
              MessageConstants.NOT_A_NUMBER
            );
          }
        );
      }
    );
  });
});
