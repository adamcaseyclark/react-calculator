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

  it("Euler's Number Raised To The User's Input (3)", () => {
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering3) => {
      cy.wrap($displayAfterEntering3).should("have.text", "3");
      cy.get(LocatorConstants.E_TO_THE_POWER_OF).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterRaisingEToThe3rdPower) => {
          expect($displayAfterRaisingEToThe3rdPower.text()).to.match(
            /20.08553692318766?[0-9]+/
          );
        }
      );
    });
  });
});
