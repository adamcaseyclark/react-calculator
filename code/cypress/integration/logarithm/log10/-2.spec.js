import { LocatorConstants } from "../../../constants/locators";
import { LogConstants } from "../../../constants/log";
import { MessageConstants } from "../../../constants/messages";

describe("log 10 Key on Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Selecting log 10 With -2 As A Value Yields Message - Not A Number", () => {
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.TOGGLE_POSITIVE_NEGATIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displaySelectingNegative2) => {
        cy.wrap($displaySelectingNegative2).should("have.text", "-2");
      }
    );

    cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).then(($log10KeyDisplay) => {
      cy.wrap($log10KeyDisplay).should("have.text", LogConstants.LOG10);

      cy.get(LocatorConstants.TWO_KEY).click();
      cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).click();

      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingBase10OnNegative2) => {
          assert.equal(
            $displayAfterSelectingBase10OnNegative2.text(),
            MessageConstants.NOT_A_NUMBER
          );
        }
      );
    });
  });
});
