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

  it("Numbers Alone Will Change All Clear (AC) To Clear (C)", () => {
    cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
      cy.wrap($clearKeyDisplayedText).should("have.text", "AC");

      cy.get(LocatorConstants.ONE_KEY).click();

      cy.get(LocatorConstants.CLEAR_KEY).then(
        ($clearButtonAfterTyping1Digit) => {
          cy.wrap($clearButtonAfterTyping1Digit).should("have.text", "C");

          cy.wrap($clearButtonAfterTyping1Digit).should("not.have.text", "AC");
        }
      );
    });
  });
});
