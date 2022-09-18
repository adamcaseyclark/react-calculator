import { LocatorConstants } from "../../../../../../../constants/locators";

describe("User Given Information For Exponent (y^x)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "0");
    });
    cy.get(LocatorConstants.SHIFT_KEY).click();
    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyAfterKeyHasBeenSelected) => {
        cy.wrap($shiftKeyAfterKeyHasBeenSelected).should("have.text", "2ⁿᵈ");
        cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");
      }
    );
  });

  it("Standard Happy Path Calculation", () => {
    cy.get(LocatorConstants.SEVEN_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelecting7ForTwoStepCalc) => {
        cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).then(
          ($xToThePowerOfYDisplayedText) => {
            cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "yx");
            cy.wrap($displayAfterSelecting7ForTwoStepCalc).should(
              "have.text",
              "7"
            );

            cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X_NOT_SELECTED).should(
              "exist"
            );

            cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).click();
            cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).then(
              ($xToThePowerOfYDisplayedText) => {
                cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "yx");

                cy.get(
                  LocatorConstants.Y_TO_THE_POWER_OF_X_WHEN_SELECTED
                ).should("exist");

                cy.get(LocatorConstants.EIGHT_KEY).click();

                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                  ($displayAfterSelecting8ForTwoStepCalc) => {
                    cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X).then(
                      ($xToThePowerOfYDisplayedText) => {
                        cy.wrap($xToThePowerOfYDisplayedText).should(
                          "have.text",
                          "yx"
                        );
                        cy.wrap($displayAfterSelecting8ForTwoStepCalc).should(
                          "have.text",
                          "8"
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

                            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                              ($displayAfterSelectingEquals) => {
                                cy.wrap($displayAfterSelectingEquals).should(
                                  "have.text",
                                  "2097152"
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
          }
        );
      }
    );
  });
});
