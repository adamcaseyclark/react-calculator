import { LocatorConstants } from "../../constants/locators";

describe("Miscellaneous Calculations #2", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("6, +, 6, + displays 12, = displays 24, = displays 36", () => {
    cy.get(LocatorConstants.SIX_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.SIX_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfter6Plus6Plus6Plus) => {
        cy.wrap($displayAfter6Plus6Plus6Plus).should("have.text", "12");

        cy.get(LocatorConstants.EQUALS_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfter6Plus6EqualsPlus3Equals) => {
            cy.wrap($displayAfter6Plus6EqualsPlus3Equals).should(
              "have.text",
              "24"
            );
            cy.get(LocatorConstants.EQUALS_KEY).click();
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAfterAnotherEquals) => {
                cy.wrap($displayAfterAnotherEquals).should("have.text", "36");
              }
            );
          }
        );
      }
    );
  });
});
