import { ExponentsConstants } from "../../../constants/exponents";
import { LocatorConstants } from "../../../constants/locators";
import { LogConstants } from "../../../constants/log";

describe("Shifted View Keyboard Layout Verification", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Using Keyboard Shortcut 'shift Will Shift Standard Layout To Alternative Layout'", () => {
    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed) => {
        cy.wrap($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed).should(
          "have.text",
          "2nd"
        );
        cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
      }
    );

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{shift}");
    cy.get(LocatorConstants.SHIFT_KEY).then(
      ($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed) => {
        cy.wrap($shiftKeyBeforeShiftKeyboardKeyHasBeenPressed).should(
          "have.text",
          "2nd"
        );
        cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");
      }
    );

    cy.get(`${LocatorConstants.GENERIC_KEY_LOCATOR_NTH_OF_TYPE}(15)`).then(
      ($15thKeyOfDisplayText) => {
        cy.get(`${LocatorConstants.GENERIC_KEY_LOCATOR_NTH_OF_TYPE}(16)`).then(
          ($16thKeyOfDisplayText) => {
            cy.get(
              `${LocatorConstants.GENERIC_KEY_LOCATOR_NTH_OF_TYPE}(25)`
            ).then(($24thKeyOfDisplayText) => {
              cy.get(
                `${LocatorConstants.GENERIC_KEY_LOCATOR_NTH_OF_TYPE}(26)`
              ).then(($25thKeyOfDisplayText) => {
                assert.equal(
                  $15thKeyOfDisplayText.text(),
                  ExponentsConstants.YX
                );
                assert.equal(
                  $16thKeyOfDisplayText.text(),
                  ExponentsConstants.TWO_X
                );
                assert.equal(
                  $24thKeyOfDisplayText.text(),
                  LogConstants.LOG_TO_THE_USERS_INPUT
                );
                assert.equal($25thKeyOfDisplayText.text(), LogConstants.LOG2);
                // TODO: INVERSE KEYS FOR SIN, COS, TAN, SINH, COSH, TANH
              });
            });
          }
        );
      }
    );
  });
});
