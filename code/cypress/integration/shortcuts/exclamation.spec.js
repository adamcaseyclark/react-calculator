import { LocatorConstants } from "../../constants/locators";

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

  it("Exclamation Mark KeyBoard Shortcut Inserts Triggers Factorial Function Key", () => {
    // CALLING FACTORIAL ON 0 IS 1
    // (SHIFT + 1) TO SELECT EXCLAMATION POINT (!)
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{!}");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterAfterSelectingFactorialKey) => {
        cy.wrap($displayAfterAfterSelectingFactorialKey).should(
          "have.text",
          "1"
        );
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterSelectingFactorialKey) => {
          cy.wrap($previouslyDisplayedAfterSelectingFactorialKey).should(
            "have.text",
            'previous="" operator="" lastKey="x!" calculationInProgress="" audit="" shortcutKeys="!"'
          );
        }
      );
    }
  });
});
