import { LocatorConstants } from "../../../constants/locators";

describe("Altering A Memory Value Using `m-`)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.reload();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
      cy.wrap($displayAfterReload).should("have.text", "0");
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
              }
            );

            // CLEAR CURRENTLY C

            cy.get(LocatorConstants.ALL_CLEAR_KEY).click();
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
      });
    });
  });

  it("Alter Value To Display, Subtracting Entered Value With `m-` And Recall Value With `mr`", () => {
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAdding200) => {
      cy.wrap($displayAfterAdding200).should("have.text", "200");

      cy.get(LocatorConstants.SUBTRACT_FROM_MEMORY_KEY).click();

      // CLEAR CURRENTLY C

      cy.get(LocatorConstants.ALL_CLEAR_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterAllClearIsSelected) => {
          cy.wrap($displayAfterAllClearIsSelected).should("have.text", "0");
          cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
            cy.wrap($clearKeyDisplayedText).should("have.text", "AC");

            cy.get(LocatorConstants.RECALL_MEMORY_KEY).click();
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($recallMemoryKeyAfterAddingValueToMemory) => {
                cy.wrap($recallMemoryKeyAfterAddingValueToMemory).should(
                  "have.text",
                  "577"
                );

                // VERIFYING NOT SAME BEHAVIOR AS `m+`
                cy.wrap($recallMemoryKeyAfterAddingValueToMemory).should(
                  "not.have.text",
                  "977"
                );
              }
            );
          });
        }
      );

      // VERIFYING RECALL KEY IS STILL SELECTED AFTER ALTERING VALUE
      cy.get(LocatorConstants.RECALL_MEMORY_KEY).then(
        ($recallMemoryKeyBeforeAddingValueToMemory) => {
          cy.wrap($recallMemoryKeyBeforeAddingValueToMemory).should(
            "have.text",
            "mr"
          );
          cy.get(LocatorConstants.RECALL_MEMORY_KEY_WHEN_SELECTED).should(
            "exist"
          );

          // // VALUE STILL DISPLAYS AFTER ADDING TO MEMORY
          // cy.get(LocatorConstants.ADD_MEMORY_KEY).click();
          // cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          //   ($recallMemoryKeyAfterAddingValueToMemory) => {
          //     cy.wrap($recallMemoryKeyAfterAddingValueToMemory).should(
          //       "have.text",
          //       "777"
          //     );
          //
          //     // MEMORY RECALL KEY IS NOW SELECTED AFTER MEMORY VALUE ADDED
          //     cy.get(LocatorConstants.RECALL_MEMORY_KEY).then(
          //       ($recallMemoryKeyAfterAddingValueToMemory) => {
          //         cy.wrap($recallMemoryKeyAfterAddingValueToMemory).should(
          //           "have.text",
          //           "mr"
          //         );
          //         cy.get(
          //           LocatorConstants.RECALL_MEMORY_KEY_WHEN_SELECTED
          //         ).should("exist");
          //       }
          //     );
          //   }
          // );
        }
      );
    });
  });
});
