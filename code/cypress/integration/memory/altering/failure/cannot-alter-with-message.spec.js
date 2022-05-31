import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Failure: Cannot Alter Memory Value With Text Message Using `m+`", () => {
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

            // MEMORY RECALL KEY IS NOT SELECTED BEFORE MEMORY VALUE ADDED
            cy.get(LocatorConstants.RECALL_MEMORY_KEY).then(
              ($recallMemoryKeyBeforeAddingValueToMemory) => {
                cy.wrap($recallMemoryKeyBeforeAddingValueToMemory).should(
                  "have.text",
                  "mr"
                );
                cy.get(LocatorConstants.RECALL_MEMORY_KEY_NOT_SELECTED).should(
                  "exist"
                );

                // VALUE STILL DISPLAYS AFTER ADDING TO MEMORY
                cy.get(LocatorConstants.ADD_MEMORY_KEY).click();
                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                  ($recallMemoryKeyAfterAddingValueToMemory) => {
                    cy.wrap($recallMemoryKeyAfterAddingValueToMemory).should(
                      "have.text",
                      "777"
                    );

                    // MEMORY RECALL KEY IS NOW SELECTED AFTER MEMORY VALUE ADDED
                    cy.get(LocatorConstants.RECALL_MEMORY_KEY).then(
                      ($recallMemoryKeyAfterAddingValueToMemory) => {
                        cy.wrap(
                          $recallMemoryKeyAfterAddingValueToMemory
                        ).should("have.text", "mr");
                        cy.get(
                          LocatorConstants.RECALL_MEMORY_KEY_WHEN_SELECTED
                        ).should("exist");
                      }
                    );

                    // CLICKING ON / VERIFYING CLEAR KEY IS CHANGING TEXT
                    cy.get(
                      LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT
                    )
                      .contains("C")
                      .click();
                    cy.get(
                      LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT
                    )
                      .contains("AC")
                      .click();

                    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                      ($displayAfterAllClearIsSelected) => {
                        cy.wrap($displayAfterAllClearIsSelected).should(
                          "have.text",
                          "0"
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

  it("Not A Number Message To User Cannot Be Used To Alter Memory", () => {
    cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterBaseTenLogSelectedToGetNotANumberUserMessage) => {
        cy.wrap(
          $displayAfterBaseTenLogSelectedToGetNotANumberUserMessage
        ).should("have.text", MessageConstants.NOT_A_NUMBER);

        // MESSAGE REMAINS ON SCREEN
        cy.get(LocatorConstants.ADD_MEMORY_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($recallMemoryKeyAfterAttemptingToAddMessageToMemory) => {
            cy.wrap($recallMemoryKeyAfterAttemptingToAddMessageToMemory).should(
              "have.text",
              MessageConstants.NOT_A_NUMBER
            );

            // MEMORY RECALL KEY IS STILL SELECTED
            cy.get(LocatorConstants.RECALL_MEMORY_KEY).then(
              ($recallMemoryKeyAfterAttemptingToAddMessageToMemory) => {
                cy.wrap(
                  $recallMemoryKeyAfterAttemptingToAddMessageToMemory
                ).should("have.text", "mr");
                cy.get(LocatorConstants.RECALL_MEMORY_KEY_WHEN_SELECTED).should(
                  "exist"
                );

                // CLICKING ON / VERIFYING CLEAR KEY IS CHANGING TEXT
                cy.get(
                  LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT
                )
                  .contains("C")
                  .click();
                cy.get(
                  LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT
                )
                  .contains("AC")
                  .click();

                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                  ($displayAfterAllClearIsSelected) => {
                    cy.wrap($displayAfterAllClearIsSelected).should(
                      "have.text",
                      "0"
                    );

                    cy.get(LocatorConstants.RECALL_MEMORY_KEY).click();
                    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                      ($recallMemoryKeyAfterAttemptingToAddMessageToMemory) => {
                        cy.wrap(
                          $recallMemoryKeyAfterAttemptingToAddMessageToMemory
                        ).should("have.text", "777");

                        // VERIFYING BEHAVIOR IS NOT SAME BEHAVIOR AS `m-`
                        cy.wrap(
                          $recallMemoryKeyAfterAttemptingToAddMessageToMemory
                        ).should("not.have.text", "-777");
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
