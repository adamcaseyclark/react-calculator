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

  it("Repeatedly Selecting Equals With Perform Last Subtraction Calculation", () => {
    cy.NoOperationKeyIsCurrentlySelected();

    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.NoOperationKeyIsCurrentlySelected();

    cy.get(LocatorConstants.SUBTRACTION_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEntering400) => {
        cy.wrap($displayAfterEntering400).should("have.text", "400");
        cy.get(LocatorConstants.SUBTRACTION_KEY).then(($subtractionKeyText) => {
          cy.wrap($subtractionKeyText).should("have.text", "-");

          // SUBTRACTION OPERATOR STAYS HIGHLIGHTED WHILE ALL THE NUMBERS ADDED
          cy.get(LocatorConstants.SUBTRACTION_KEY_WHEN_SELECTED).should(
            "exist"
          );
          cy.get(LocatorConstants.TWO_KEY).click();
          cy.get(LocatorConstants.SUBTRACTION_KEY_WHEN_SELECTED).should(
            "exist"
          );
          cy.get(LocatorConstants.ZERO_KEY).click();
          cy.get(LocatorConstants.SUBTRACTION_KEY_WHEN_SELECTED).should(
            "exist"
          );
          cy.get(LocatorConstants.ZERO_KEY).click();
          cy.get(LocatorConstants.SUBTRACTION_KEY_WHEN_SELECTED).should(
            "exist"
          );

          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterEntering200) => {
              cy.wrap($displayAfterEntering200).should("have.text", "200");
              cy.get(LocatorConstants.SUBTRACTION_KEY).then(
                ($subtractionKeyText) => {
                  cy.wrap($subtractionKeyText).should("have.text", "-");

                  cy.get(LocatorConstants.SUBTRACTION_KEY_WHEN_SELECTED).should(
                    "exist"
                  );

                  cy.get(LocatorConstants.EQUALS_KEY).click();
                  cy.get(LocatorConstants.SUBTRACTION_KEY_NOT_SELECTED).should(
                    "exist"
                  );

                  cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                    ($displayAfterEqualsOnce) => {
                      cy.wrap($displayAfterEqualsOnce).should(
                        "have.text",
                        "200"
                      );
                      cy.get(LocatorConstants.EQUALS_KEY).click();
                      cy.get(
                        LocatorConstants.SUBTRACTION_KEY_NOT_SELECTED
                      ).should("exist");

                      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                        ($displayAfterEqualsTwice) => {
                          cy.wrap($displayAfterEqualsTwice).should(
                            "have.text",
                            "0"
                          );

                          cy.get(LocatorConstants.EQUALS_KEY).click();
                          cy.get(
                            LocatorConstants.SUBTRACTION_KEY_NOT_SELECTED
                          ).should("exist");

                          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                            ($displayAfterEqualsThrice) => {
                              cy.wrap($displayAfterEqualsThrice).should(
                                "have.text",
                                "-200"
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
      }
    );
  });
});
