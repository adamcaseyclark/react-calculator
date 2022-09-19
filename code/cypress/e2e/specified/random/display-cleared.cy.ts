import { LocatorConstants } from "../../../constants/locators";
import { RegexConstants } from "../../../constants/regex";

describe("Random Key Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Any Displayed Value Will Be Cleared When Random key Before Displaying Random Value", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayBeforeEntering123) => {
        cy.wrap($displayBeforeEntering123).should("have.text", "123");
        cy.get(LocatorConstants.RANDOM_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterRandomKeyIsSelected) => {
            assert.match(
              $displayAfterRandomKeyIsSelected.text(),
              RegexConstants.RANDOM_FLOAT_BETWEEN_ONE_AND_ZERO
            );
          }
        );
      }
    );
  });
});
