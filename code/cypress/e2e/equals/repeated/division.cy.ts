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

  it("Repeatedly Selecting Equals With Perform Last Division Calculation", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.EIGHT_KEY).click();
    cy.get(LocatorConstants.DIVISION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering18) => {
      cy.wrap($displayAfterEntering18).should("have.text", "18");
      cy.get(LocatorConstants.DIVISION_KEY).then(($divisionKeyText) => {
        cy.wrap($divisionKeyText).should("have.text", "÷");

        cy.get(LocatorConstants.DIVISION_KEY_WHEN_SELECTED).should("exist");

        cy.get(LocatorConstants.SIX_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterEntering6) => {
            cy.wrap($displayAfterEntering6).should("have.text", "6");
            cy.get(LocatorConstants.DIVISION_KEY).then(($divisionKeyText) => {
              cy.wrap($divisionKeyText).should("have.text", "÷");

              cy.get(LocatorConstants.DIVISION_KEY_WHEN_SELECTED).should(
                "exist"
              );

              cy.get(LocatorConstants.EQUALS_KEY).click();
              cy.get(LocatorConstants.DIVISION_KEY_NOT_SELECTED).should(
                "exist"
              );

              cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                ($displayAfterEqualsOnce) => {
                  cy.wrap($displayAfterEqualsOnce).should("have.text", "3");
                  cy.get(LocatorConstants.EQUALS_KEY).click();
                  cy.get(LocatorConstants.DIVISION_KEY_NOT_SELECTED).should(
                    "exist"
                  );

                  cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                    ($displayAfterEqualsTwice) => {
                      cy.wrap($displayAfterEqualsTwice).should(
                        "have.text",
                        "0.5"
                      );

                      cy.get(LocatorConstants.EQUALS_KEY).click();
                      cy.get(LocatorConstants.DIVISION_KEY_NOT_SELECTED).should(
                        "exist"
                      );

                      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                        ($displayAfterEqualsThrice) => {
                          assert.match(
                            $displayAfterEqualsThrice.text(),
                            /0.083333333333333?[3]+/
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
    });
  });
});
