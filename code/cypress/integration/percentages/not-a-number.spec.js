import { LocatorConstants } from "../../constants/locators";
import { MessageConstants } from "../../constants/messages";

describe("Percentage Key Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Not A Number Message Will Persist, Is Not Cleared By Selecting Percentage", () => {
    cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingBase10On0) => {
        cy.wrap($displayAfterSelectingBase10On0).should(
          "have.text",
          MessageConstants.NOT_A_NUMBER
        );
        cy.get(LocatorConstants.PERCENTAGE_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingNotANumberMessageAndPercentageKey) => {
            cy.wrap(
              $displayAfterSelectingNotANumberMessageAndPercentageKey
            ).should("have.text", MessageConstants.NOT_A_NUMBER);
            cy.wrap(
              $displayAfterSelectingNotANumberMessageAndPercentageKey
            ).should("not.have.text", "Not a numb.er");
          }
        );
      }
    );
  });
});
