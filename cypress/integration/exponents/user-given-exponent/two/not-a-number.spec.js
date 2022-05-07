import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("10 Raised To The Displayed Number Key (User Given Exponent)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.reload();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
      cy.wrap($displayAfterReload).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Repeated Pushing", () => {
    cy.get(LocatorConstants.TEN_TO_THE_POWER_OF).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfter10ToThePowerUserGivenOnce) => {
        cy.wrap($displayAfter10ToThePowerUserGivenOnce).should(
          "have.text",
          "1"
        );
        cy.get(LocatorConstants.TEN_TO_THE_POWER_OF).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfter10ToThePowerUserGivenTwice) => {
            cy.wrap($displayAfter10ToThePowerUserGivenTwice).should(
              "have.text",
              "10"
            );
            cy.get(LocatorConstants.TEN_TO_THE_POWER_OF).click();
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAfter10ToThePowerUserGivenThrice) => {
                cy.wrap($displayAfter10ToThePowerUserGivenThrice).should(
                  "have.text",
                  "10000000000"
                );

                cy.waitForCalculator()

                // cy.clickOnKeyAndVerifyCalculatorStillPresent(
                //   LocatorConstants.TEN_TO_THE_POWER_OF
                // );

              //   cy.get(LocatorConstants.TEN_TO_THE_POWER_OF).click();
              //   cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              //     ($displayAfter10ToThePowerUserGivenFourth) => {
              //       cy.wrap($displayAfter10ToThePowerUserGivenFourth).should(
              //         "have.text",
              //         MessageConstants.NOT_A_NUMBER
              //       );
              //     }
              //   );
              }
            );
          }
        );
      }
    );
  });
});
