import { LocatorConstants } from "../../../../../constants/locators";

describe("Eulers Number (e) Raised To The User Given Exponent", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Euler's Number Raised To The User's Input (2)", () => {
    cy.get(LocatorConstants.TWO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering2) => {
      cy.wrap($displayAfterEntering2).should("have.text", "2");
      cy.get(LocatorConstants.E_TO_THE_POWER_OF).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterRaisingEToThe2ndPower) => {
          expect($displayAfterRaisingEToThe2ndPower.text()).to.match(
            /7.38905609893065?[0-9]+/
          );
        }
      );
    });
  });
});
