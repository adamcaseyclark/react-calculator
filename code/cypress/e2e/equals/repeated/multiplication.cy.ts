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

  it("Repeatedly Selecting Equals With Perform Last Multiplication Calculation", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.MULTIPLICATION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering10) => {
      cy.wrap($displayAfterEntering10).should("have.text", "10");
      cy.get(LocatorConstants.MULTIPLICATION_KEY).then(
        ($multiplicationKeyText) => {
          cy.wrap($multiplicationKeyText).should("have.text", "*");

          cy.get(LocatorConstants.MULTIPLICATION_KEY_WHEN_SELECTED).should(
            "exist"
          );
          cy.get(LocatorConstants.TWO_KEY).click();
          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterEntering2) => {
              cy.wrap($displayAfterEntering2).should("have.text", "2");
              cy.get(LocatorConstants.MULTIPLICATION_KEY).then(
                ($multiplicationKeyText) => {
                  cy.wrap($multiplicationKeyText).should("have.text", "*");

                  cy.get(
                    LocatorConstants.MULTIPLICATION_KEY_WHEN_SELECTED
                  ).should("exist");

                  cy.get(LocatorConstants.EQUALS_KEY).click();
                  cy.get(
                    LocatorConstants.MULTIPLICATION_KEY_NOT_SELECTED
                  ).should("exist");

                  cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                    ($displayAfterEqualsOnce) => {
                      cy.wrap($displayAfterEqualsOnce).should(
                        "have.text",
                        "20"
                      );
                      cy.get(LocatorConstants.EQUALS_KEY).click();
                      cy.get(
                        LocatorConstants.MULTIPLICATION_KEY_NOT_SELECTED
                      ).should("exist");

                      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                        ($displayAfterEqualsTwice) => {
                          cy.wrap($displayAfterEqualsTwice).should(
                            "have.text",
                            "40"
                          );

                          cy.get(LocatorConstants.EQUALS_KEY).click();
                          cy.get(
                            LocatorConstants.MULTIPLICATION_KEY_NOT_SELECTED
                          ).should("exist");

                          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                            ($displayAfterEqualsThrice) => {
                              cy.wrap($displayAfterEqualsThrice).should(
                                "have.text",
                                "80"
                              );
                            }
                          );
                        }
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
});
