import { LocatorConstants } from "../../../constants/locators";

describe("Exponential Notation Calculation: Display", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("One Clear Displays Calculated Whole Number - 1.2 e 11 Equals 120000000000", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.DECIMAL_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayWhenSelectingExponentialNotationOnOnePointTwo) => {
        cy.wrap($displayWhenSelectingExponentialNotationOnOnePointTwo).should(
          "have.text",
          "1.2 e 0"
        );
      }
    );

    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ONE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayWhenSelectingExponentialNotationAfterAdding11ToNotation) => {
        cy.wrap(
          $displayWhenSelectingExponentialNotationAfterAdding11ToNotation
        ).should("have.text", "1.2 e 11");
      }
    );

    cy.get(LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT)
      .contains("C")
      .click();

    cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
      cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
    });

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($finalDisplayOfTest) => {
      cy.wrap($finalDisplayOfTest).should("have.text", "120000000000");
    });
  });
});
