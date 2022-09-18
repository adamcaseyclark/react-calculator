import { LocatorConstants } from "../../../constants/locators";
import { ValueConstants } from "../../../constants/values";

describe("Operator Functionality - Behavior", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Subtract E Value And Equals Into Negative Value", () => {
    cy.get(LocatorConstants.SUBTRACTION_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSubtractionIsSelected) => {
        cy.wrap($displayAfterSubtractionIsSelected).should("have.text", "0");
      }
    );

    cy.get(LocatorConstants.SUBTRACTION_KEY_WHEN_SELECTED).should("exist");
    cy.get(LocatorConstants.E_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEWasSelected) => {
        cy.wrap($displayAfterEWasSelected).should(
          "have.text",
          ValueConstants.EULERS
        );
      }
    );

    cy.get(LocatorConstants.SUBTRACTION_KEY_WHEN_SELECTED).should("exist");
    cy.get(LocatorConstants.EQUALS_KEY).click();
    cy.get(LocatorConstants.SUBTRACTION_KEY_NOT_SELECTED).should("exist");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayShowingATheEValueNegative) => {
        cy.wrap($displayShowingATheEValueNegative).should(
          "have.text",
          `-${ValueConstants.EULERS}`
        );
      }
    );
  });
});
