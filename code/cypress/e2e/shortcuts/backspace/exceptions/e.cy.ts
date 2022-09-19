import { LocatorConstants } from "../../../../constants/locators";
import { ValueConstants } from "../../../../constants/values";

describe("Keyboard Shortcuts Of Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("After Using e Function Key To Display Euler, Backspace Will Not Modify Number", () => {
    cy.get(LocatorConstants.E_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingLetterEForEulersNumber) => {
        cy.wrap($displayAfterTypingLetterEForEulersNumber).should(
          "have.text",
          ValueConstants.EULERS
        );

        cy.get(LocatorConstants.DOCUMENT_BODY).type("{backspace}");
        cy.get(LocatorConstants.DOCUMENT_BODY).type("{backspace}");
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterTypingBackspaceKeyTwiceOnE) => {
            cy.wrap($displayAfterTypingBackspaceKeyTwiceOnE).should(
              "have.text",
              ValueConstants.EULERS
            );
          }
        );

        // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
        // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
        if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
          cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
            ($previouslyDisplayedValuesTypingBackspaceKeyTwiceOnE) => {
              cy.wrap(
                $previouslyDisplayedValuesTypingBackspaceKeyTwiceOnE
              ).should(
                "have.text",
                'previous="" operator="" lastKey="e" calculationInProgress="" audit="" shortcutKeys="backspace"'
              );
            }
          );
        }
      }
    );
  });
});
