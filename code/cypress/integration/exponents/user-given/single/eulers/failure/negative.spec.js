import { LocatorConstants } from "../../../../../../constants/locators";
import { MessageConstants } from "../../../../../../constants/messages";

describe("Eulers Number (e) Raised To The User Given Exponent - Failure", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Euler's Number Cannot Be Raised To A Negative Number", () => {
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.TOGGLE_POSITIVE_NEGATIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEnteringNeg2) => {
        cy.wrap($displayAfterEnteringNeg2).should("have.text", "-2");
        cy.get(LocatorConstants.E_TO_THE_POWER_OF).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterRaisingEToThENeg2Power) => {
            cy.wrap($displayAfterRaisingEToThENeg2Power).should(
              "have.text",
              MessageConstants.NOT_A_NUMBER
            );
          }
        );
      }
    );
  });
});
