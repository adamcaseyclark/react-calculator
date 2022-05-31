import { LocatorConstants } from "../../../../constants/locators";

describe("Division Operator Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Can Divide One Number From Another", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($currentValueDisplayAfter12345Added) => {
        cy.wrap($currentValueDisplayAfter12345Added).should(
          "have.text",
          "12345"
        );

        cy.get(LocatorConstants.DIVISION_KEY).click();
        // TEXT REMAINS ON SCREEN AFTER DIVISION IS SELECTED
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($currentValueDisplayAfterDivisionKey) => {
            cy.wrap($currentValueDisplayAfterDivisionKey).should(
              "have.text",
              "12345"
            );

            cy.get(LocatorConstants.DIVISION_KEY_WHEN_SELECTED).should("exist");

            cy.get(LocatorConstants.ONE_KEY).click();
            cy.get(LocatorConstants.TWO_KEY).click();
            cy.get(LocatorConstants.THREE_KEY).click();
            cy.get(LocatorConstants.FOUR_KEY).click();
            cy.get(LocatorConstants.FIVE_KEY).click();

            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($currentValueDisplayAfter12345AddedAgain) => {
                cy.wrap($currentValueDisplayAfter12345AddedAgain).should(
                  "have.text",
                  "12345"
                );

                cy.get(LocatorConstants.EQUALS_KEY).click();
                cy.get(LocatorConstants.DIVISION_KEY_NOT_SELECTED).should(
                  "exist"
                );

                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                  ($currentValueDisplayAfterDivisionKey) => {
                    cy.wrap($currentValueDisplayAfterDivisionKey).should(
                      "have.text",
                      "1"
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});
