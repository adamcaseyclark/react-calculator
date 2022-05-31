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

  it("Selecting Does Not Display Clear Key, All Clear Key Still Persists", () => {
    cy.get(LocatorConstants.CLEAR_KEY).then(($allClearKeyDisplayedText) => {
      cy.wrap($allClearKeyDisplayedText).should("have.text", "AC");
      cy.get(LocatorConstants.RANDOM_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterRandomKeyIsSelected) => {
          assert.match(
            $displayAfterRandomKeyIsSelected.text(),
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
        }
      );
    });
  });
});
