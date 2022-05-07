import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Addition Operator Behavior - Will Yield Zero With No Previous Entry", () => {
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

  it("No Previous Value Entered Will Yield 0 When Added And Equals", () => {
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayWhenNoDataEntered) => {
        cy.wrap($displayWhenNoDataEntered).should("have.text", "0");

        cy.get(LocatorConstants.ADDITION_KEY).click();
        cy.get(LocatorConstants.EQUALS_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingAddAndEquals) => {
            cy.wrap($displayAfterSelectingAddAndEquals).should(
              "have.text",
              "0"
            );

            cy.wrap($displayAfterSelectingAddAndEquals).should(
              "not.have.text",
              MessageConstants.NOT_A_NUMBER
            );

            cy.wrap($displayAfterSelectingAddAndEquals).should(
              "not.have.text",
              "NaN"
            );
          }
        );
      }
    );
  });
});
