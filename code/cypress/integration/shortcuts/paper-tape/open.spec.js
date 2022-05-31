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

  it("Typing 'control + t' Will Open Paper Tape Modal", () => {
    cy.get(LocatorConstants.PAPER_TAPE_MODAL_WHEN_NOT_PRESENT).should("exist");

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{control}{t}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingControlPlusLetterT) => {
        cy.wrap($displayAfterTypingControlPlusLetterT).should("have.text", "0");
      }
    );

    cy.get(LocatorConstants.PAPER_TAPE_MODAL_WHEN_PRESENT).should("exist");

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterTypingControlPlusLetterT) => {
          cy.wrap(
            $previouslyDisplayedValuesAfterTypingControlPlusLetterT
          ).should(
            "have.text",
            'previous="" operator="" lastKey="cntl+t" calculationInProgress="" audit="" shortcutKeys="cntl+t"'
          );
        }
      );
    }
  });
});
