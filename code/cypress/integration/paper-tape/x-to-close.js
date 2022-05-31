import { LocatorConstants } from "../../constants/locators";

describe("Keyboard Shortcuts Of Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
        cy.get(LocatorConstants.DOCUMENT_BODY).type("{control}{t}");
        cy.get(LocatorConstants.PAPER_TAPE_MODAL).should("exist");
      });
    });
  });

  it("Clicking X On Modal Will Close Modal (Same As Shortcut)", () => {
    cy.get(LocatorConstants.X_TO_CLOSE_PAPER_TAPE).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingToClosePaperTapeModalByClickingOnX) => {
        cy.wrap(
          $displayAfterSelectingToClosePaperTapeModalByClickingOnX
        ).should("have.text", "0");
      }
    );

    cy.get(LocatorConstants.PAPER_TAPE_MODAL_WHEN_NOT_PRESENT).should("exist");

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedValuesAfterClickingOnXToCloseModal) => {
          cy.wrap(
            $previouslyDisplayedValuesAfterClickingOnXToCloseModal
          ).should(
            "have.text",
            'previous="" operator="" lastKey="x" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
