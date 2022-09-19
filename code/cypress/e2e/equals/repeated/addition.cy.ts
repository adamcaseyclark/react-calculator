import { LocatorConstants } from "../../../constants/locators";

describe("Equals Key Functionality - Repeated", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Repeatedly Selecting Equals With Perform Last Addition Calculation", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering123) => {
        cy.wrap($displayAfterEntering123).should("have.text", "123");
        cy.get(LocatorConstants.ADDITION_KEY).then(($additionKeyText) => {
          cy.wrap($additionKeyText).should("have.text", "+");

          // ADDITION KEY STAYS SELECTED UNTIL EQUALS OR ANOTHER OPERATOR
          cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");
          cy.get(LocatorConstants.FOUR_KEY).click();
          cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");
          cy.get(LocatorConstants.FIVE_KEY).click();
          cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");
          cy.get(LocatorConstants.SIX_KEY).click();

          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterEntering456) => {
              cy.wrap($displayAfterEntering456).should("have.text", "456");
              cy.get(LocatorConstants.ADDITION_KEY).then(($additionKeyText) => {
                cy.wrap($additionKeyText).should("have.text", "+");

                cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should(
                  "exist"
                );

                cy.get(LocatorConstants.EQUALS_KEY).click();
                cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should(
                  "exist"
                );

                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                  ($displayAfterEqualsOnce) => {
                    cy.wrap($displayAfterEqualsOnce).should("have.text", "579");
                    cy.get(LocatorConstants.EQUALS_KEY).click();
                    cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should(
                      "exist"
                    );

                    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                      ($displayAfterEqualsTwice) => {
                        cy.wrap($displayAfterEqualsTwice).should(
                          "have.text",
                          "1035"
                        );

                        cy.get(LocatorConstants.EQUALS_KEY).click();
                        cy.get(
                          LocatorConstants.ADDITION_KEY_NOT_SELECTED
                        ).should("exist");

                        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                          ($displayAfterEqualsThrice) => {
                            cy.wrap($displayAfterEqualsThrice).should(
                              "have.text",
                              "1491"
                            );
                          }
                        );
                      }
                    );
                  }
                );
              });
            }
          );
        });
      }
    );
  });
});
