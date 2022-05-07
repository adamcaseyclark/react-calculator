import { LocatorConstants } from "../../constants/locators";
import { ValueConstants } from "../../constants/values";

describe("Euler Key Display (e)", () => {
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

  it("E key on the Calculator will display the number to the nth Power", () => {
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "0");
      cy.get(LocatorConstants.E_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
        cy.wrap($display).should("have.text", ValueConstants.EULERS);
      });
    });
  });

  it("Any Displayed Value Will Be Cleared When E key Before Displaying By E Value", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering123) => {
        cy.wrap($displayAfterEntering123).should("have.text", "123");
        cy.get(LocatorConstants.E_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterEntering123AndE) => {
            cy.wrap($displayAfterEntering123AndE).should(
              "have.text",
              ValueConstants.EULERS
            );
          }
        );
      }
    );
  });

  it("Selecting Does Not Display Clear Key, All Clear Key Still Persists", () => {
    cy.get(LocatorConstants.CLEAR_KEY).then(($allClearKeyDisplayedText) => {
      cy.wrap($allClearKeyDisplayedText).should("have.text", "AC");
      cy.get(LocatorConstants.E_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingE) => {
          cy.wrap($displayAfterSelectingE).should(
            "have.text",
            ValueConstants.EULERS
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
