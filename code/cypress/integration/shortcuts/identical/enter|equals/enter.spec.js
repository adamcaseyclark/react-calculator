import { LocatorConstants } from "../../../../constants/locators";

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

  it("Using Enter Key Will Act As Selecting Equals Key On Calculator", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.ONE_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterEnteringOnePlusOne) => {
        cy.wrap($displayAfterEnteringOnePlusOne).should("have.text", "1");
      }
    );

    cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{enter}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingEnter) => {
        cy.wrap($displayAfterTypingEnter).should("have.text", "2");
        cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should("exist");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterUsingKeyboardToChooseEnter) => {
          cy.wrap(
            $previouslyDisplayedValuesAfterUsingKeyboardToChooseEnter
          ).should(
            "have.text",
            'previous="1" operator="+" lastKey="=" calculationInProgress="" audit="" shortcutKeys="Enter"'
          );
        }
      );
    }
  });
});
