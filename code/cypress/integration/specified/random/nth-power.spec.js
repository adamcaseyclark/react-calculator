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

  it("Random Key Will Give A Random Decimal Between 0 And 1", () => {
    cy.get(LocatorConstants.RANDOM_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterRandomKeySelected) => {
        assert.match(
          $displayAfterRandomKeySelected.text(),
          RegexConstants.RANDOM_FLOAT_BETWEEN_ONE_AND_ZERO
        );
      }
    );
  });
});
