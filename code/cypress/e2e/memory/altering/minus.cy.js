import { LocatorConstants } from "../../../constants/locators";

describe("Altering A Memory Value Using `m-`)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");

        cy.get(LocatorConstants.SEVEN_KEY).click();
        cy.get(LocatorConstants.SEVEN_KEY).click();
        cy.get(LocatorConstants.SEVEN_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterAdding777) => {
            cy.wrap($displayAfterAdding777).should("have.text", "777");

            cy.get(LocatorConstants.ADD_MEMORY_KEY).click();
            cy.get(LocatorConstants.RECALL_MEMORY_KEY).then(
              ($recallMemoryKeyAfterAddingValueToMemory) => {
                cy.wrap($recallMemoryKeyAfterAddingValueToMemory).should(
                  "have.text",
                  "mr"
                );
                cy.get(LocatorConstants.RECALL_MEMORY_KEY_WHEN_SELECTED).should(
                  "exist"
                );
                cy.performClearingProcessAndVerifyCalculatorDisplayValues(
                  "777"
                );
              }
            );
          }
        );
      });
    });
  });

  it("Alter Value To Display, Altering Stored Value With `m-` And Recall Value With `mr`", () => {
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAdding200) => {
      cy.wrap($displayAfterAdding200).should("have.text", "200");

      cy.get(LocatorConstants.SUBTRACT_FROM_MEMORY_KEY).click();

      cy.get(LocatorConstants.RECALL_MEMORY_KEY).then(
        ($recallMemoryKeyBeforeModifyingMemoryValue) => {
          cy.wrap($recallMemoryKeyBeforeModifyingMemoryValue).should(
            "have.text",
            "mr"
          );
          cy.get(LocatorConstants.RECALL_MEMORY_KEY_WHEN_SELECTED).should(
            "exist"
          );

          cy.get(LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT)
            .contains("C")
            .click();

          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterClearingOnce) => {
              cy.wrap($displayAfterClearingOnce).should("have.text", "200");

              cy.get(
                LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT
              )
                .contains("AC")
                .click();

              cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                ($displayAfterClearingTwice) => {
                  cy.wrap($displayAfterClearingTwice).should("have.text", "0");

                  // VERIFYING RECALL KEY IS STILL SELECTED AFTER ALTERING VALUE
                  cy.get(LocatorConstants.RECALL_MEMORY_KEY).then(
                    ($recallMemoryKeyBeforeAddingValueToMemory) => {
                      cy.wrap($recallMemoryKeyBeforeAddingValueToMemory).should(
                        "have.text",
                        "mr"
                      );
                      cy.get(
                        LocatorConstants.RECALL_MEMORY_KEY_WHEN_SELECTED
                      ).should("exist");

                      cy.get(LocatorConstants.RECALL_MEMORY_KEY).click();
                      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                        ($displayAfterRemovingMemory) => {
                          cy.wrap($displayAfterRemovingMemory).should(
                            "have.text",
                            "577"
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
