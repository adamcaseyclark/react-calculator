import { LocatorConstants } from "../../../constants/locators";

describe("Factorial Key Functionality (x!)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("When 0 Is The Input - 1 is the Returned Value", () => {
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAdding0) => {
      cy.wrap($displayAfterAdding0).should("have.text", "0");

      cy.get(LocatorConstants.FACTORIAL_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterAfterSelectingFactorialKey) => {
          cy.wrap($displayAfterAfterSelectingFactorialKey).should(
            "have.text",
            "1"
          );
        }
      );
    });
  });
});
