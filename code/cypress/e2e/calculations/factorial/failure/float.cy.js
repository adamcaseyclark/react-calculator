import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Factorial Key Functionality (x!)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it('No Float Values, Will Return Message "Not a number"', () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.DECIMAL_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterAdding1Point2) => {
        cy.wrap($displayAfterAdding1Point2).should("have.text", "1.2");

        cy.get(LocatorConstants.FACTORIAL_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterAfterSelectingFactorialKey) => {
            cy.wrap($displayAfterAfterSelectingFactorialKey).should(
              "have.text",
              MessageConstants.NOT_A_NUMBER
            );
          }
        );
      }
    );
  });
});
