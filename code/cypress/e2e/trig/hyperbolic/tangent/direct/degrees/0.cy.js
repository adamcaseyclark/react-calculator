import { LocatorConstants } from "../../../../../../constants/locators";

describe("Trigonometric Function Keys - Hyperbolic Tangent In Degrees", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("0 Degrees Returns A Value Of 0", () => {
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering0) => {
      cy.wrap($displayAfterEntering0).should("have.text", "0");

      cy.get(LocatorConstants.HYPERBOLIC_TANGENT_KEY).click();

      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingHyperbolicTangentOn0) => {
          cy.wrap($displayAfterSelectingHyperbolicTangentOn0).should(
            "have.text",
            "0"
          );
        }
      );
    });
  });
});
