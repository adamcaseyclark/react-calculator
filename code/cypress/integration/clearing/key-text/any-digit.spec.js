import { LocatorConstants } from "../../../constants/locators";

describe("Clearing Display Functionality - C / AC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Key Text Changes From AC To C When Any Number Digit Is Entered Into Calculator", () => {
    cy.get(LocatorConstants.ONE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering1) => {
      cy.wrap($displayAfterEntering1).should("have.text", "1");
      cy.get(LocatorConstants.CLEAR_KEY).then(
        ($clearKeyDisplayedTextAfterEntering1) => {
          cy.wrap($clearKeyDisplayedTextAfterEntering1).should(
            "have.text",
            "C"
          );

          cy.wrap($clearKeyDisplayedTextAfterEntering1).should(
            "not.have.text",
            "AC"
          );
        }
      );
    });
  });
});
