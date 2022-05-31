import { LocatorConstants } from "../../../../constants/locators";

describe("Clearing Behavior - What Triggers Changing (AC) To (C)?", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("An Operator Alone Will Not Change All Clear (AC) To Clear (C)", () => {
    cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
      cy.wrap($clearKeyDisplayedText).should("have.text", "AC");

      cy.get(LocatorConstants.ADDITION_KEY).click();

      cy.get(LocatorConstants.CLEAR_KEY).then(
        ($clearButtonAfterSelectingAdditionKey) => {
          cy.wrap($clearButtonAfterSelectingAdditionKey).should(
            "have.text",
            "AC"
          );

          cy.wrap($clearButtonAfterSelectingAdditionKey).should(
            "not.have.text",
            "C"
          );
        }
      );
    });
  });
});
