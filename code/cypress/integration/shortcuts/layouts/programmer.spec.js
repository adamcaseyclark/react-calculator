import { LocatorConstants } from "../../../constants/locators";

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

  it.skip("Typing 'control + 3' Will Change The Layout Of Calculator To Programmer", () => {
    // SKIPPING TEST - DIFFERENT LAYOUTS NOT IMPLEMENTED YET

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{control}{3}");
    // HAS NO EFFECT ON DISPLAY
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingControlPlusNumber3) => {
        cy.wrap($displayAfterTypingControlPlusNumber3).should("have.text", "0");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTypingControlPlusNumber3) => {
          cy.wrap(
            $previouslyDisplayedValuesAfterTypingControlPlusNumber3
          ).should(
            "have.text",
            'previous="" operator="" lastKey="cntl+3" calculationInProgress="" audit="" shortcutKeys="cntl+3"'
          );
        }
      );
    }
  });
});
