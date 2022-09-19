import { LocatorConstants } from "../../../../../../constants/locators";

describe("User Given Information For Exponent (x^y)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "0");
    });
  });

  it("Key Will Remain Highlighted While User Information Is Gathered And Equals", () => {
    cy.get(LocatorConstants.SEVEN_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelecting7ForTwoStepCalc) => {
        cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).then(
          ($xToThePowerOfYDisplayedText) => {
            cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "xy");
            cy.wrap($displayAfterSelecting7ForTwoStepCalc).should(
              "have.text",
              "7"
            );

            cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y_NOT_SELECTED).should(
              "exist"
            );

            cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).click();
            cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).then(
              ($xToThePowerOfYDisplayedText) => {
                cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "xy");

                cy.get(
                  LocatorConstants.X_TO_THE_POWER_OF_Y_WHEN_SELECTED
                ).should("exist");

                cy.get(LocatorConstants.EIGHT_KEY).click();

                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                  ($displayAfterSelecting8ForTwoStepCalc) => {
                    cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).then(
                      ($xToThePowerOfYDisplayedText) => {
                        cy.wrap($xToThePowerOfYDisplayedText).should(
                          "have.text",
                          "xy"
                        );
                        cy.wrap($displayAfterSelecting8ForTwoStepCalc).should(
                          "have.text",
                          "8"
                        );

                        cy.get(
                          LocatorConstants.X_TO_THE_POWER_OF_Y_WHEN_SELECTED
                        ).should("exist");

                        cy.get(LocatorConstants.EQUALS_KEY).click();
                        cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).then(
                          ($xToThePowerOfYDisplayedText) => {
                            cy.wrap($xToThePowerOfYDisplayedText).should(
                              "have.text",
                              "xy"
                            );

                            cy.get(
                              LocatorConstants.X_TO_THE_POWER_OF_Y_NOT_SELECTED
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
      }
    );
  });
});
