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

  it("Key Text Changes From AC To C When 0 Is Entered Into Calculator", () => {
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering0) => {
      cy.wrap($displayAfterEntering0).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(
        ($clearKeyDisplayedTextAfterEntering0) => {
          cy.wrap($clearKeyDisplayedTextAfterEntering0).should(
            "have.text",
            "C"
          );

          cy.wrap($clearKeyDisplayedTextAfterEntering0).should(
            "not.have.text",
            "AC"
          );
        }
      );
    });
  });
});
