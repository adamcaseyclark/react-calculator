import { LocatorConstants } from "../../../../../constants/locators";
import { MessageConstants } from "../../../../../constants/messages";

describe("10 Raised To The Displayed Number Key (User Given Exponent)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Will Accept Negative Numbers", () => {
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.TOGGLE_POSITIVE_NEGATIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEnteringNeg7) => {
        cy.wrap($displayAfterEnteringNeg7).should("have.text", "-7");
        cy.get(LocatorConstants.TEN_TO_THE_POWER_OF).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterRaisingEToThENeg7Power) => {
            cy.wrap($displayAfterRaisingEToThENeg7Power).should(
              "have.text",
              "0.0000001"
            );
          }
        );
      }
    );
  });
});
