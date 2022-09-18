import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Failure: Cannot Add Text As Memory Using `m+`", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Not A Number Message To User Cannot Be Added To Memory", () => {
    cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterBaseTenLogSelectedToGetUserMessage) => {
        cy.wrap($displayAfterBaseTenLogSelectedToGetUserMessage).should(
          "have.text",
          MessageConstants.NOT_A_NUMBER
        );

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

            cy.get(LocatorConstants.ADD_MEMORY_KEY).click();

            // TEXT DOES NOT LEAVE SCREEN
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($recallMemoryKeyAfterAddingValueToMemory) => {
                cy.wrap($recallMemoryKeyAfterAddingValueToMemory).should(
                  "have.text",
                  MessageConstants.NOT_A_NUMBER
                );

                // MEMORY RECALL KEY IS NOT SELECTED AFTER THE ATTEMPT
                cy.get(LocatorConstants.RECALL_MEMORY_KEY).then(
                  ($recallMemoryKeyAfterAddingValueToMemory) => {
                    cy.wrap($recallMemoryKeyAfterAddingValueToMemory).should(
                      "have.text",
                      "mr"
                    );
                    cy.get(
                      LocatorConstants.RECALL_MEMORY_KEY_NOT_SELECTED
                    ).should("exist");
                  }
                );

                cy.get(LocatorConstants.RECALL_MEMORY_KEY).click();
                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                  ($recallMemoryKeyAfterAddingValueToMemory) => {
                    cy.wrap($recallMemoryKeyAfterAddingValueToMemory).should(
                      "have.text",
                      "0"
                    );

                    cy.wrap($recallMemoryKeyAfterAddingValueToMemory).should(
                      "not.have.text",
                      "NaN"
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
