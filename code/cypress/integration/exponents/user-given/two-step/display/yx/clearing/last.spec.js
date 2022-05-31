import { LocatorConstants } from "../../../../../../../constants/locators";

describe("User Given Information (Two Step) For Exponent (y^x) - Clearing", () => {
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
    });
  });

  it("Clear on (C) Will Remove Last Input, Key Remains Selected, User Can Input Another Value", () => {
    cy.get(LocatorConstants.SEVEN_KEY).click();

    cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).then(
      ($xToThePowerOfYDisplayedText) => {
        cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "yx");

        cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X_NOT_SELECTED).should(
          "exist"
        );

        cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).click();
        cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).then(
          ($xToThePowerOfYDisplayedText) => {
            cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "yx");

            cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X_WHEN_SELECTED).should(
              "exist"
            );

            cy.get(LocatorConstants.EIGHT_KEY).click();
            cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).then(
              ($xToThePowerOfYDisplayedText) => {
                cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "yx");

                cy.get(
                  LocatorConstants.Y_TO_THE_POWER_OF_X_WHEN_SELECTED
                ).should("exist");

                cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).click();
                cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).then(
                  ($xToThePowerOfYDisplayedText) => {
                    cy.wrap($xToThePowerOfYDisplayedText).should(
                      "have.text",
                      "yx"
                    );

                    cy.get(
                      LocatorConstants.Y_TO_THE_POWER_OF_X_WHEN_SELECTED
                    ).should("exist");

                    cy.get(LocatorConstants.EQUALS_KEY).click();
                    cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).then(
                      ($xToThePowerOfYDisplayedText) => {
                        cy.wrap($xToThePowerOfYDisplayedText).should(
                          "have.text",
                          "yx"
                        );

                        cy.get(
                          LocatorConstants.Y_TO_THE_POWER_OF_X_NOT_SELECTED
                        ).should("exist");
                      }
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
