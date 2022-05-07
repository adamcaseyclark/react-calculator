import { LocatorConstants } from "../../../constants/locators";
import { MessageConstants } from "../../../constants/messages";
import { LogConstants } from "../../../constants/log";

describe("log 10 Key on Calculator", () => {
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

  it("Selecting log 10 With No Value To Calculate Will Yield Not A Number Display", () => {
    cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).then(($log10KeyDisplay) => {
      cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingBase10On0) => {
          cy.wrap($log10KeyDisplay).should("have.text", LogConstants.LOG10);

          cy.wrap($displayAfterSelectingBase10On0).should(
            "have.text",
            MessageConstants.NOT_A_NUMBER
          );
        }
      );
    });
  });
});
