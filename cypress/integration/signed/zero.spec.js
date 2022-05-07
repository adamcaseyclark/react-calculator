import { LocatorConstants } from "../../constants/locators";

describe("Cannot Make Zero Negative", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.reload();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
      cy.wrap($displayAfterReload).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Cannot Display Zero As Negative", () => {
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.CLEAR_KEY).then(
      ($clearKeyDisplayedTextAfterEntering0) => {
        cy.wrap($clearKeyDisplayedTextAfterEntering0).should("have.text", "C");
        cy.wrap($clearKeyDisplayedTextAfterEntering0).should(
          "not.have.text",
          "AC"
        );

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterEnteringZero) => {
            cy.wrap($displayAfterEnteringZero).should("have.text", "0");

            cy.get(LocatorConstants.TOGGLE_POSITIVE_NEGATIVE_KEY).click();

            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAfterEnteringZero) => {
                cy.wrap($displayAfterEnteringZero).should("have.text", "0");
                cy.wrap($displayAfterEnteringZero).should(
                  "not.have.text",
                  "-0"
                );
              }
            );
          }
        );
      }
    );
  });
});
