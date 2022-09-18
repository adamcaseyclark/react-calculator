import { LocatorConstants } from "../../../../../constants/locators";

describe("10 Raised To The Displayed Number Key (User Given Exponent)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("No Value Entered Will Yield An Answer Of 1", () => {
    cy.get(LocatorConstants.TEN_TO_THE_POWER_OF).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterNotANumberMessageAndAllClear) => {
        cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
          "have.text",
          "1"
        );
      }
    );
  });
});
