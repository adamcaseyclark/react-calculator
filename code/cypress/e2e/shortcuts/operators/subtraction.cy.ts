import { LocatorConstants } from "../../../constants/locators";
import { TextConstants } from "../../../../src/constants/text";

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

  it("Typing '-' Chooses The Subtraction Operator", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DOCUMENT_BODY).type(
      `{${TextConstants.SUBTRACTION_SIGN}}`
    );
    cy.get(LocatorConstants.SUBTRACTION_KEY_WHEN_SELECTED).should("exist");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTyping123SubtractionSign) => {
        assert.equal($displayAfterTyping123SubtractionSign.text(), "123");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterTyping123SubtractionSign) => {
          cy.wrap($previouslyDisplayedAfterTyping123SubtractionSign).should(
            "have.text",
            'previous="" operator="-" lastKey="-" calculationInProgress="" audit="" shortcutKeys="-"'
          );
        }
      );
    }
  });
});
