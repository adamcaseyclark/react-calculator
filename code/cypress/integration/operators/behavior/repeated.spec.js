import { LocatorConstants } from "../../../constants/locators";

describe("Repeated Operator Selecting Does Not Increment", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("One Plus One Plus...Stays At One", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.ADDITION_KEY).then(($additionKeyText) => {
      cy.wrap($additionKeyText).should("have.text", "+");
      cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");

      cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfter1Plus1) => {
        cy.wrap($displayAfter1Plus1).should("have.text", "2");

        cy.get(LocatorConstants.ADDITION_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterAnotherSelectingOfAddition) => {
            cy.wrap($displayAfterAnotherSelectingOfAddition).should(
              "have.text",
              "2"
            );
          }
        );
      });
    });
  });
});
