import { LocatorConstants } from "../../constants/locators";
import { MessageConstants } from "../../constants/messages";

describe("Signing Values: Cannot Make Letters Negative - Not A Number Message", () => {
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

  it("Cannot Display Message To User - `Not A Number Message` As Negative", () => {
    cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterBaseTenLogSelectedToGetUserMessage) => {
        cy.wrap($displayAfterBaseTenLogSelectedToGetUserMessage).should(
          "have.text",
          MessageConstants.NOT_A_NUMBER
        );

        cy.get(LocatorConstants.TOGGLE_POSITIVE_NEGATIVE_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterNegatingCurrentDisplayedValue) => {
            cy.wrap($displayAfterNegatingCurrentDisplayedValue).should(
              "have.text",
              MessageConstants.NOT_A_NUMBER
            );
            cy.wrap($displayAfterNegatingCurrentDisplayedValue).should(
              "not.have.text",
              "-Not a number"
            );
          }
        );
      }
    );
  });
});
