import { LocatorConstants } from "../../../../constants/locators";

describe("Display Tests: Notated Numbers - Smallest", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it('Largest Number That Will Display As A Whole Number "9 999 999 999 999 999"', () => {
    cy.get(LocatorConstants.NINE_KEY).click();

    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();

    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();

    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();

    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();

    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();
    cy.get(LocatorConstants.NINE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTyping9999999999999999) => {
        cy.wrap($displayAfterTyping9999999999999999).should(
          "have.text",
          "9999999999999999"
        );

        cy.get(LocatorConstants.EQUALS_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingEquals9999999999999999) => {
            cy.wrap($displayAfterSelectingEquals9999999999999999).should(
              "have.text",
              "9.999999999999999e15"
            );
          }
        );
      }
    );
  });
});
