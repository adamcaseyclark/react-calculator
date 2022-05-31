import { LocatorConstants } from "../../../constants/locators";

describe("Operator Functionality - Will Overwrite", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  // TODO: ADD CYPRESS CONDITIONAL TO CHECK OPERATOR IS CHANGING

  it("Operator Will Overwrite Previously Entered Operator", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();

    cy.get(LocatorConstants.MULTIPLICATION_KEY).then(
      ($multiplicationKeyText) => {
        cy.wrap($multiplicationKeyText).should("have.text", "*");

        cy.get(LocatorConstants.MULTIPLICATION_KEY_WHEN_SELECTED).should(
          "exist"
        );
        cy.get(LocatorConstants.ADDITION_KEY).click();
        cy.get(LocatorConstants.MULTIPLICATION_KEY_NOT_SELECTED).should(
          "exist"
        );

        cy.get(LocatorConstants.ADDITION_KEY).then(($additionKeyText) => {
          cy.wrap($additionKeyText).should("have.text", "+");

          cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");

          cy.get(LocatorConstants.ONE_KEY).click();
          cy.get(LocatorConstants.EQUALS_KEY).click();

          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterOverwritingMultiplicationWithAddition) => {
              cy.wrap(
                $displayAfterOverwritingMultiplicationWithAddition
              ).should("have.text", "2");
            }
          );
        });
      }
    );
  });
});
