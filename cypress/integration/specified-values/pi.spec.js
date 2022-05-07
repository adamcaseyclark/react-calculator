import { LocatorConstants } from "../../constants/locators";
import { ValueConstants } from "../../constants/values";

describe("PI key on Calculator", () => {
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

  it("PI key on the Calculator will display the number to the nth Power", () => {
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "0");
      cy.get(LocatorConstants.PI_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
        cy.wrap($display).should("have.text", ValueConstants.PI);
      });
    });
  });

  it("Any Displayed Value Will Be Cleared When PI key Before Displaying By PI Value", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "123");
      cy.get(LocatorConstants.PI_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
        cy.wrap($display).should("have.text", ValueConstants.PI);
      });
    });
  });

  it("Selecting Does Not Display Clear Key, All Clear Key Still Persists", () => {
    cy.get(LocatorConstants.CLEAR_KEY).then(($allClearKeyDisplayedText) => {
      cy.wrap($allClearKeyDisplayedText).should("have.text", "AC");
      cy.get(LocatorConstants.PI_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingE) => {
          cy.wrap($displayAfterSelectingE).should(
            "have.text",
            ValueConstants.PI
          );
          cy.get(LocatorConstants.CLEAR_KEY).then(
            ($allClearKeyDisplayedTextAfterESelected) => {
              cy.wrap($allClearKeyDisplayedTextAfterESelected).should(
                "have.text",
                "AC"
              );
            }
          );
        }
      );
    });
  });
});
