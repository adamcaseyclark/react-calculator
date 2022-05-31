import { LocatorConstants } from "../../../../../../../constants/locators";

describe("User Given Information For Exponent (x^y)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "0");
    });
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y).click();
    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.EQUALS_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingEquals) => {
        cy.wrap($displayAfterSelectingEquals).should("have.text", "5764801");
      }
    );
  });

  it("Into Another Equation Calculation", () => {
    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterAddingAdditionOperator) => {
        cy.wrap($displayAfterAddingAdditionOperator).should(
          "have.text",
          "5764801"
        );
      }
    );

    cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAdding3) => {
      cy.wrap($displayAfterAdding3).should("have.text", "3");
    });

    cy.get(LocatorConstants.EQUALS_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingEquals) => {
        cy.wrap($displayAfterSelectingEquals).should("have.text", "5764804");
      }
    );
  });
});
