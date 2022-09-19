import { CommonConstants } from "../../../../constants/common";
import { LocatorConstants } from "../../../../constants/locators";

describe("Exponential Notation (EE) Display - Selecting EE Twice", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Displays Empty Exponential Notation Correctly", () => {
    cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingEEOnce) => {
        cy.wrap($displayAfterSelectingEEOnce).should(
          "have.text",
          CommonConstants.EMPTY_EXPONENTIAL_NOTATION
        );

        cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingEETwice) => {
            cy.wrap($displayAfterSelectingEETwice).should("have.text", "0 e 0");
            cy.wrap($displayAfterSelectingEETwice).should(
              "not.have.text",
              "0 e 0 e 0"
            );
          }
        );
      }
    );
  });
});
