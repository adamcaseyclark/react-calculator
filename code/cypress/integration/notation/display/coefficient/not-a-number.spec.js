import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Exponential Notation (EE) Display - Coefficient", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Not A Number Message Won't Be Used As Coefficient", () => {
    cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterGettingNotANumberMessage) => {
        cy.wrap($displayAfterGettingNotANumberMessage).should(
          "have.text",
          MessageConstants.NOT_A_NUMBER
        );

        cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterEnteringEE) => {
            cy.wrap($displayAfterEnteringEE).should(
              "not.have.text",
              `${MessageConstants.NOT_A_NUMBER} e 0`
            );
            cy.wrap($displayAfterEnteringEE).should(
              "have.text",
              MessageConstants.NOT_A_NUMBER
            );
          }
        );
      }
    );
  });
});
