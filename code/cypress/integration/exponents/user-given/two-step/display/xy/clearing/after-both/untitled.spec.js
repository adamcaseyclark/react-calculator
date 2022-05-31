import { LocatorConstants } from "../../../../../../../../constants/locators";

describe("User Given Information (Two Step) For Exponent (x^y) - Clearing After First Step", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "0");
      cy.get(LocatorConstants.SEVEN_KEY).click();
      cy.get(LocatorConstants.SEVEN_KEY).click();
      cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).click();
      cy.get(LocatorConstants.EIGHT_KEY).click();

      cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).then(
        ($xToThePowerOfYDisplayedText) => {
          cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "xy");
          cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y_WHEN_SELECTED).should(
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
        cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).then(
          ($xToThePowerOfYDisplayedText) => {
            cy.wrap($clearKeyDisplayedText).should("have.text", "C");
            cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "xy");
            cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y_WHEN_SELECTED).should(
              "exist"
            );
            cy.wrap($displayOfCalculator).should("have.text", "8");

            cy.get(LocatorConstants.CLEAR_KEY).click();
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayOfCalculatorAfterSelectingClear) => {
                cy.get(LocatorConstants.CLEAR_KEY).then(
                  ($clearKeyDisplayedTextAfterSelectingClear) => {
                    cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).then(
                      ($xToThePowerOfYDisplayedTextAfterSelectingClear) => {
                        cy.wrap(
                          $clearKeyDisplayedTextAfterSelectingClear
                        ).should("have.text", "AC");
                        cy.wrap(
                          $xToThePowerOfYDisplayedTextAfterSelectingClear
                        ).should("have.text", "xy");
                        cy.get(
                          LocatorConstants.X_TO_THE_POWER_OF_Y_WHEN_SELECTED
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
