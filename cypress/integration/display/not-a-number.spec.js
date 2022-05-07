import { LocatorConstants } from "../../constants/locators";
import { MessageConstants } from "../../constants/messages";

describe("Not A Number Message Is Displayed", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.reload();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
      cy.wrap($displayAfterReload).should("have.text", "0");
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

  it("Can All Clear Display", () => {
    cy.get(LocatorConstants.ALL_CLEAR_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterNotANumberMessageAndAllClear) => {
        cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
          "not.have.text",
          MessageConstants.NOT_A_NUMBER
        );
        cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
          "have.text",
          "0"
        );
      }
    );
  });

  it("Can Select Any Number", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterNotANumberMessageAndAllClear) => {
        cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
          "not.have.text",
          MessageConstants.NOT_A_NUMBER
        );
        cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
          "have.text",
          "1"
        );
      }
    );
  });

  it("Can Not Select An Operator, Not A Number Message Persists", () => {
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterNotANumberMessageAndAllClear) => {
        cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
          "not.have.text",
          '0'
        );
        cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
          "have.text",
            MessageConstants.NOT_A_NUMBER
        );
      }
    );
  });
});
