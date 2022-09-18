import { LocatorConstants } from "../../../constants/locators";
import { ValueConstants } from "../../../constants/values";

describe("PI key on Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Selecting Does Not Display Clear Key (C), The All Clear Key (AC) Still Persists", () => {
    cy.get(LocatorConstants.CLEAR_KEY).then(($allClearKeyDisplayedText) => {
      cy.wrap($allClearKeyDisplayedText).should("have.text", "AC");
      cy.get(LocatorConstants.PI_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingE) => {
          cy.wrap($displayAfterSelectingE).should(
            "have.text",
            ValueConstants.PI
          );
          cy.get(LocatorConstants.CLEAR_KEY).then(
            ($allClearKeyDisplayedTextAfterESelected) => {
              cy.wrap($allClearKeyDisplayedTextAfterESelected).should(
                "have.text",
                "AC"
              );

              cy.wrap($allClearKeyDisplayedTextAfterESelected).should(
                "not.have.text",
                "C"
              );
            }
          );
        }
      );
    });
  });
});
