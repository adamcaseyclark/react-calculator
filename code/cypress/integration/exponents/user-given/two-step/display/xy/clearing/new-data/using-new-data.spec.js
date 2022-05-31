import { LocatorConstants } from "../../../../../../../../constants/locators";
import { RegexConstants } from "../../../../../../../../constants/regex";

describe("User Given Information (Two Step) For Exponent (x^y) - Clearing And Continue With New Data", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "0");
    });
  });

  it("Clear on (C) Will Remove Last Input, Key Remains Selected, User Can Input Another Value", () => {
    cy.get(LocatorConstants.SEVEN_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterSelecting7) => {
      cy.wrap($displayAfterSelecting7).should("have.text", "7");
    });

    cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).then(
      ($xToThePowerOfYDisplayedText) => {
        cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "xy");

        cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y_NOT_SELECTED).should(
          "exist"
        );

        cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).click();
        cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).then(
          ($xToThePowerOfYDisplayedText) => {
            cy.wrap($xToThePowerOfYDisplayedText).should("have.text", "xy");

            cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y_WHEN_SELECTED).should(
              "exist"
            );

            cy.get(LocatorConstants.EIGHT_KEY).click();
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAfterSelecting8) => {
                cy.wrap($displayAfterSelecting8).should("have.text", "8");
              }
            );

            cy.get(LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT)
              .contains(RegexConstants.C_BUT_NOT_AC)
              .click();

            cy.get(LocatorConstants.CLEAR_KEY).then(
              ($clearKeyDisplayedText) => {
                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                  ($displayAfterSelectingSelectingClearC) => {
                    cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
                    cy.wrap($displayAfterSelectingSelectingClearC).should(
                      "have.text",
                      "0"
                    );

                    cy.get(
                      LocatorConstants.X_TO_THE_POWER_OF_Y_WHEN_SELECTED
                    ).should("exist");

                    cy.get(LocatorConstants.NINE_KEY).click();
                    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                      ($displayAfterSelecting9) => {
                        cy.wrap($displayAfterSelecting9).should(
                          "have.text",
                          "9"
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

                            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                              ($displayAfterSelectingEquals) => {
                                cy.wrap($displayAfterSelectingEquals).should(
                                  "have.text",
                                  "40353607"
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
