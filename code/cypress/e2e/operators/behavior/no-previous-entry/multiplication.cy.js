import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Multiplication Operator Behavior - Will Yield Zero With No Previous Entry", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("No Previous Value Entered Will Yield 0 When Multiplied And Equals", () => {
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayWhenNoDataEntered) => {
        cy.wrap($displayWhenNoDataEntered).should("have.text", "0");

        cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
        cy.get(LocatorConstants.EQUALS_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingMultipliedAndEquals) => {
            cy.wrap($displayAfterSelectingMultipliedAndEquals).should(
              "have.text",
              "0"
            );

            cy.wrap($displayAfterSelectingMultipliedAndEquals).should(
              "not.have.text",
              MessageConstants.NOT_A_NUMBER
            );

            cy.wrap($displayAfterSelectingMultipliedAndEquals).should(
              "not.have.text",
              "NaN"
            );
          }
        );
      }
    );
  });
});
