import { LocatorConstants } from "../../../constants/locators";

describe("Clearing Data From Calculator (AC)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.reload();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
      cy.wrap($displayAfterReload).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Selecting All Clear (AC) Will NOT Reset Shifted Layout", () => {
    cy.get(LocatorConstants.SHIFT_KEY).then(($shiftKeyBeforeSelecting) => {
      cy.wrap($shiftKeyBeforeSelecting).should("have.text", "2nd");
      cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");

      cy.get(LocatorConstants.SHIFT_KEY).click();
      cy.get(LocatorConstants.SHIFT_KEY).then(($shiftKeyAfterSelecting) => {
        cy.wrap($shiftKeyAfterSelecting).should("have.text", "2nd");
        cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");

        // ADDING DATA TO DISPLAY TO VERIFY IT CLEARS BUT SHIFT REMAINS
        cy.get(LocatorConstants.ONE_KEY).click();
        cy.get(LocatorConstants.TWO_KEY).click();
        cy.get(LocatorConstants.THREE_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterEntering123) => {
            cy.wrap($displayAfterEntering123).should("have.text", "123");

            cy.get(LocatorConstants.ALL_CLEAR_KEY).click();
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAfterSelectingAllClear) => {
                cy.wrap($displayAfterSelectingAllClear).should(
                  "have.text",
                  "0"
                );
                cy.get(LocatorConstants.SHIFT_KEY).then(
                  ($shiftKeyAfterAllClear) => {
                    cy.wrap($shiftKeyAfterAllClear).should("have.text", "2nd");
                    cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should(
                      "exist"
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
});
