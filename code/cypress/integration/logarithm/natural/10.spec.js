import { LocatorConstants } from "../../../constants/locators";
import { LogConstants } from "../../../constants/log";

describe("Natural Logarithm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("10 Yields A Number Of 2.302585092994046", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingTen) => {
        cy.wrap($displayAfterSelectingTen).should("have.text", "10");
      }
    );

    cy.get(LocatorConstants.NATURAL_LOGARITHM_KEY).then(
      ($naturalLogarithmKeyText) => {
        cy.get(LocatorConstants.NATURAL_LOGARITHM_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingTheNaturalLogarithmOn10) => {
            cy.wrap($naturalLogarithmKeyText).should(
              "have.text",
              LogConstants.NATURAL_LOG
            );

            cy.wrap($displayAfterSelectingTheNaturalLogarithmOn10).should(
              "have.text",
              "2.302585092994046"
            );
          }
        );
      }
    );
  });
});
