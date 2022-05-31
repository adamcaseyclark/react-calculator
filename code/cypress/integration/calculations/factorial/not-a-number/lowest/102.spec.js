import { LocatorConstants } from "../../../../../constants/locators";
import { MessageConstants } from "../../../../../constants/messages";

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

  it("102 Returns Message To User - `Not A Number` Message", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAdding161) => {
      cy.wrap($displayAfterAdding161).should("have.text", "102");

      cy.get(LocatorConstants.FACTORIAL_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterAfterSelectingFactorialKey) => {
          assert.equal(
            $displayAfterAfterSelectingFactorialKey.text(),
            MessageConstants.NOT_A_NUMBER
          );
        }
      );
    });
  });
});
