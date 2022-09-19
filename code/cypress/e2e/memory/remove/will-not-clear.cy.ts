import { LocatorConstants } from "../../../constants/locators";

describe("Removing A Memory Value (mc)", () => {
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
              }
            );
          }
        );
      });
    });
  });

  it("Removing Value From Memory Does Not Clear Screen", () => {
    cy.get(LocatorConstants.MEMORY_CLEAR_KEY).click();
    cy.get(LocatorConstants.RECALL_MEMORY_KEY).then(
      ($recallKeyAfterMemoryIsCleared) => {
        cy.wrap($recallKeyAfterMemoryIsCleared).should("have.text", "mr");
        cy.get(LocatorConstants.RECALL_MEMORY_KEY_NOT_SELECTED).should("exist");

        // // ADDING DATA TO DISPLAY TO VERIFY MEMORY RECALL RETURNS A 0
        // cy.get(LocatorConstants.ONE_KEY).click();
        // cy.get(LocatorConstants.TWO_KEY).click();
        // cy.get(LocatorConstants.THREE_KEY).click();

        // cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        //   ($displayAfterEntering123) => {
        //     cy.wrap($displayAfterEntering123).should("have.text", "123");

        cy.get(LocatorConstants.RECALL_MEMORY_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterRemovingMemory) => {
            cy.wrap($displayAfterRemovingMemory).should("have.text", "0");
          }
        );
      }
    );
    // });
  });
});
