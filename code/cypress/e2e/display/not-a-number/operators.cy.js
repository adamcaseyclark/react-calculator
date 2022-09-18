import { LocatorConstants } from "../../../constants/locators";
import { MessageConstants } from "../../../constants/messages";

describe("Not A Number Message Is Displayed", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
        cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingBase10On0) => {
            cy.wrap($displayAfterSelectingBase10On0).should(
              "have.text",
              MessageConstants.NOT_A_NUMBER
            );
          }
        );
      });
    });
  });

  it("Can Not Select An Operator | Operater Will Not Clear, Message Persists", () => {
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterNotANumberMessageAndAllClear) => {
        cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
          "not.have.text",
          "0"
        );
        cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
          "have.text",
          MessageConstants.NOT_A_NUMBER
        );
      }
    );
  });
});
