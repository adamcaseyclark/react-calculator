import { LocatorConstants } from "../../constants/locators";

describe("Miscellaneous Calculations #3", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("1 + 1 + (2) + Remains 2", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfter1Plus1Plus) => {
      cy.wrap($displayAfter1Plus1Plus).should("have.text", "2");

      cy.get(LocatorConstants.ADDITION_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterAnotherAdditionOperator) => {
          cy.wrap($displayAfterAnotherAdditionOperator).should(
            "have.text",
            "2"
          );
          cy.get(LocatorConstants.ADDITION_KEY).click();
          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterAnotherAnotherAdditionOperator) => {
              cy.wrap($displayAfterAnotherAnotherAdditionOperator).should(
                "have.text",
                "2"
              );
            }
          );
        }
      );
    });
  });
});
