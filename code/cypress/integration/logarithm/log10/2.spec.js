import { LocatorConstants } from "../../../constants/locators";
import { LogConstants } from "../../../constants/log";

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

  it("Selecting log 10 With 2 As A Value Yields 0.3010299956639812", () => {
    cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).then(($log10KeyDisplay) => {
      cy.wrap($log10KeyDisplay).should("have.text", LogConstants.LOG10);

      cy.get(LocatorConstants.TWO_KEY).click();
      cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).click();

      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingBase10On2) => {
          assert.match(
            $displayAfterSelectingBase10On2.text(),
            /0\.3010299956639812?/
          );
        }
      );
    });
  });
});
