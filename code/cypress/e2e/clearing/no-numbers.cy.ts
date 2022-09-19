import { LocatorConstants } from "../../constants/locators";

describe("Clearing After Adding An Operator, No Numbers", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Input Does Not Change AC To C, Key Selected, Single Clear Will Clear Display", () => {
    cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should("exist");
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");
    // CONFIRMING TEXT ON CLEAR KEY THEN SELECTING KEY BY TEXT CONFIRMED
    cy.get(LocatorConstants.CLEAR_KEY)
      .then(($clearKeyDisplayedTextAfterSelectingAdditionKey) => {
        cy.wrap($clearKeyDisplayedTextAfterSelectingAdditionKey).should(
          "have.text",
          "AC"
        );
      })
      .get(LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT)
      .contains("AC")
      .click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterASingleClear) => {
        cy.wrap($displayAfterASingleClear).should("have.text", "0");
      }
    );

    cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should("exist");
  });
});
