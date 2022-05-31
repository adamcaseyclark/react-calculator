import { LocatorConstants } from "../../../constants/locators";

describe("Factorial Key Functionality (x!) - Negative Numbers", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("When -22 Is The Input -  is the Returned Value", () => {
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.TOGGLE_POSITIVE_NEGATIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterAddingNeg22) => {
        cy.wrap($displayAfterAddingNeg22).should("have.text", "-22");

        cy.get(LocatorConstants.FACTORIAL_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterAfterSelectingFactorialKey) => {
            // TODO: FIX ROUNDING ISSUE WITH TO FIXED FN()
            assert.match(
              $displayAfterAfterSelectingFactorialKey.text(),
              /-1\.12400072777760(8e21|77e21)/
            );
          }
        );
      }
    );
  });
});
