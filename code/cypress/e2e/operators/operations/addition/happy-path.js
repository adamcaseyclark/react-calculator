import { LocatorConstants } from "../../../../constants/locators";

describe("Addition Operator Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Can Add Two Number Together", () => {
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

        cy.get(LocatorConstants.ADDITION_KEY).click();
        // TEXT REMAINS ON SCREEN AFTER ADDITION IS SELECTED
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($currentValueDisplayAfterAdditionKey) => {
            cy.wrap($currentValueDisplayAfterAdditionKey).should(
              "have.text",
              "12345"
            );

            cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");

            cy.get(LocatorConstants.SIX_KEY).click();
            cy.get(LocatorConstants.SEVEN_KEY).click();
            cy.get(LocatorConstants.EIGHT_KEY).click();
            cy.get(LocatorConstants.NINE_KEY).click();

            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($currentValueDisplayAfter6789Added) => {
                cy.wrap($currentValueDisplayAfter6789Added).should(
                  "have.text",
                  "6789"
                );

                cy.get(LocatorConstants.EQUALS_KEY).click();
                cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should(
                  "exist"
                );

                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                  ($currentValueDisplayAfterAdditionKey) => {
                    cy.wrap($currentValueDisplayAfterAdditionKey).should(
                      "have.text",
                      "19134"
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
