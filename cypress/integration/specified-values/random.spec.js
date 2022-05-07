import { LocatorConstants } from "../../constants/locators";
import { RegexConstants } from "../../constants/regex";
import { ValueConstants } from "../../constants/values";

describe("Random Key Functionality", () => {
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

  it("Random Key Will Give A Random Decimal Between 0 And 1", () => {
    cy.get(LocatorConstants.RANDOM_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should(
        "match",
        RegexConstants.RANDOM_FLOAT_BETWEEN_ONE_AND_ZERO
      );
    });
  });

  it("Any Displayed Value Will Be Cleared When Random key Before Displaying Random Value", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "123");
      cy.get(LocatorConstants.RANDOM_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
        cy.wrap($display).should(
          "match",
          RegexConstants.RANDOM_FLOAT_BETWEEN_ONE_AND_ZERO
        );
      });
    });
  });

  it("Selecting Does Not Display Clear Key, All Clear Key Still Persists", () => {
    cy.get(LocatorConstants.CLEAR_KEY).then(($allClearKeyDisplayedText) => {
      cy.wrap($allClearKeyDisplayedText).should("have.text", "AC");
      cy.get(LocatorConstants.RANDOM_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
        cy.wrap($display).should(
          "match",
          RegexConstants.RANDOM_FLOAT_BETWEEN_ONE_AND_ZERO
        );
        cy.get(LocatorConstants.CLEAR_KEY).then(
          ($allClearKeyDisplayedTextAfterESelected) => {
            cy.wrap($allClearKeyDisplayedTextAfterESelected).should(
              "have.text",
              "AC"
            );
          }
        );
      });
    });
  });
});
