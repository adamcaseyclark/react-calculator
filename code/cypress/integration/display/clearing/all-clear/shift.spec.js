import { LocatorConstants } from "../../../../constants/locators";
import { RegexConstants } from "../../../../constants/regex";

describe("Clearing Data From Calculator (AC)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");

        cy.get(LocatorConstants.SHIFT_KEY).click();
        cy.get(LocatorConstants.SHIFT_KEY).then(($shiftKeyAfterSelecting) => {
          cy.wrap($shiftKeyAfterSelecting).should("have.text", "2ⁿᵈ");
          cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");

          // ADDING DATA TO DISPLAY TO VERIFY IT CLEARS BUT SHIFT REMAINS
          cy.get(LocatorConstants.ONE_KEY).click();
          cy.get(LocatorConstants.TWO_KEY).click();
          cy.get(LocatorConstants.THREE_KEY).click();

          // ENTER NUMBERS - NO OPERATOR
          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterEntering123) => {
              cy.wrap($displayAfterEntering123).should("have.text", "123");

              // WILL HAVE (C) DISPLAYED - SELECTING BY TEXT TO VERIFY
              cy.get(
                LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT
              )
                .contains(RegexConstants.C_BUT_NOT_AC)
                .click();

              // cy.waitForTextToChange(LocatorConstants.DISPLAYED_VALUE, "123");

              cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                ($displayAfterSelectingClear) => {
                  // cy.wrap($displayAfterSelectingClear).should("have.text", "0");
                  cy.get(LocatorConstants.SHIFT_KEY).then(
                    ($shiftKeyAfterAllClear) => {
                      cy.wrap($shiftKeyAfterAllClear).should(
                        "have.text",
                        "2ⁿᵈ"
                      );
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

  it("Selecting All Clear (C) Will NOT Reset Shifted Layout", () => {
    // WILL HAVE (AC) DISPLAYED - SELECTING BY TEXT TO VERIFY
    cy.get(LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT)
      .contains(RegexConstants.AC_BUT_NOT_C)
      .click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingAllClear) => {
        cy.wrap($displayAfterSelectingAllClear).should("have.text", "0");
        cy.get(LocatorConstants.SHIFT_KEY).then(($shiftKeyAfterAllClear) => {
          cy.wrap($shiftKeyAfterAllClear).should("have.text", "2ⁿᵈ");
          cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");
        });
      }
    );
  });
});
