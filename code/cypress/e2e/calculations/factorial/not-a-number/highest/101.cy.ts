import { LocatorConstants } from "../../../../../constants/locators";

describe("Factorial Key Functionality (x!) - Not A Number Message", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("101 Returns A Value Of 9.42594775983836e159", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.ONE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAdding101) => {
      cy.wrap($displayAfterAdding101).should("have.text", "101");

      cy.get(LocatorConstants.FACTORIAL_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterAfterSelectingFactorialKey) => {
          // TODO: FIX ROUNDING ISSUE WITH TO FIXED FN()
          assert.match(
            $displayAfterAfterSelectingFactorialKey.text(),
            /9.4259477598383(6|54)e159/
          );
        }
      );
    });
  });
});
