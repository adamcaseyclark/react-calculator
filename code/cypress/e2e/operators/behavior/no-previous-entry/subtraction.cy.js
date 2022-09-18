import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Subtraction Operator Behavior - Will Yield Zero With No Previous Entry", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("No Previous Value Entered Will Yield 0 When Subtracted And Equals", () => {
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayWhenNoDataEntered) => {
        cy.wrap($displayWhenNoDataEntered).should("have.text", "0");

        cy.get(LocatorConstants.SUBTRACTION_KEY).click();
        cy.get(LocatorConstants.EQUALS_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingSubtractedAndEquals) => {
            cy.wrap($displayAfterSelectingSubtractedAndEquals).should(
              "have.text",
              "0"
            );

            cy.wrap($displayAfterSelectingSubtractedAndEquals).should(
              "not.have.text",
              MessageConstants.NOT_A_NUMBER
            );

            cy.wrap($displayAfterSelectingSubtractedAndEquals).should(
              "not.have.text",
              "NaN"
            );
          }
        );
      }
    );
  });
});
