import { LocatorConstants } from "../../../../../../../../constants/locators";

describe("User Given Information (Two Step) For Exponent (y^x) - Clearing After First Step", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "0");

      cy.get(LocatorConstants.SHIFT_KEY).click();
      cy.get(LocatorConstants.SHIFT_KEY).then(
        ($shiftKeyAfterKeyHasBeenSelected) => {
          cy.wrap($shiftKeyAfterKeyHasBeenSelected).should("have.text", "2nd");
          cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");
        }
      );

      cy.get(LocatorConstants.SEVEN_KEY).click();
      cy.get(LocatorConstants.SEVEN_KEY).click();
      cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).click();
      cy.get(LocatorConstants.EIGHT_KEY).click();

      cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).then(
        ($xToThePowerOfYDisplayedText) => {
          cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "yx");
          cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X_WHEN_SELECTED).should(
            "exist"
          );

          cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
            cy.wrap($display).should("have.text", "8");
          });
        }
      );
    });
  });

  it("Clearing Once Will Change (C) To (AC) And Deselect Exponent Key, Leaving Displayed Numbers Unchanged", () => {
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayOfCalculator) => {
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).then(
          ($xToThePowerOfYDisplayedText) => {
            cy.wrap($clearKeyDisplayedText).should("have.text", "C");
            cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "yx");
            cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X_WHEN_SELECTED).should(
              "exist"
            );
            cy.wrap($displayOfCalculator).should("have.text", "8");

            cy.get(LocatorConstants.CLEAR_KEY).click();
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayOfCalculatorAfterSelectingClear) => {
                cy.get(LocatorConstants.CLEAR_KEY).then(
                  ($clearKeyDisplayedTextAfterSelectingClear) => {
                    cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).then(
                      ($xToThePowerOfYDisplayedTextAfterSelectingClear) => {
                        cy.wrap(
                          $clearKeyDisplayedTextAfterSelectingClear
                        ).should("have.text", "AC");
                        cy.wrap(
                          $xToThePowerOfYDisplayedTextAfterSelectingClear
                        ).should("have.text", "yx");
                        cy.get(
                          LocatorConstants.Y_TO_THE_POWER_OF_X_WHEN_SELECTED
                        ).should("exist");

                        cy.wrap($displayOfCalculatorAfterSelectingClear).should(
                          "have.text",
                          "0"
                        );
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
