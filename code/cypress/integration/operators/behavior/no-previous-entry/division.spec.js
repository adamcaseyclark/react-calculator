import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Division Operator Behavior - Will Yield Not A Number Message With No Previous Entry", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("No Previous Value Entered Will Yield Not A Number Message When Divided And Equals", () => {
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayWhenNoDataEntered) => {
        cy.wrap($displayWhenNoDataEntered).should("have.text", "0");

        cy.get(LocatorConstants.DIVISION_KEY).click();
        cy.get(LocatorConstants.EQUALS_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingDividedAndEquals) => {
            cy.wrap($displayAfterSelectingDividedAndEquals).should(
              "have.text",
              MessageConstants.NOT_A_NUMBER
            );

            cy.wrap($displayAfterSelectingDividedAndEquals).should(
              "not.have.text",
              "NaN"
            );

            cy.wrap($displayAfterSelectingDividedAndEquals).should(
              "not.have.text",
              "0"
            );
          }
        );
      }
    );
  });
});
