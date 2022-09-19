import { LocatorConstants } from "../../constants/locators";
import { CommonConstants } from "../../constants/common";

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

  it("Verifying Paper Tape Content Modal", () => {
    cy.get(LocatorConstants.PAPER_TAPE_CONTENT).then(
      ($contentOfPaperTapeModal) => {
        cy.get(LocatorConstants.X_TO_CLOSE_PAPER_TAPE).then(
          ($xToClosePaperTapeModal) => {
            cy.get(LocatorConstants.PAPER_TAPE_CLEAR).then(
              ($clearingModalButton) => {
                assert.equal(
                  $contentOfPaperTapeModal.text(),
                  ""
                );
                assert.equal(
                  $xToClosePaperTapeModal.text().trim(),
                  CommonConstants.X_SYMBOL_TO_CLOSE_MODALS
                );
                assert.equal($clearingModalButton.text(), "clear");
              }
            );
          }
        );
      }
    );
  });
});
