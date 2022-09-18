import { LocatorConstants } from "../../../../constants/locators";
import { RegexConstants } from "../../../../constants/regex";

let numberDisplayedByRandom;
let numberDisplayedByRandomLength;

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

  it("After Using Rand Function Key To Display Number, Backspace Will Not Modify Number", () => {
    cy.get(LocatorConstants.RANDOM_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterUsingRandomKeyToDisplayNumber) => {
        numberDisplayedByRandom =
          $displayAfterUsingRandomKeyToDisplayNumber.text();

        numberDisplayedByRandomLength =
          $displayAfterUsingRandomKeyToDisplayNumber.text().length;

        assert.match(
          $displayAfterUsingRandomKeyToDisplayNumber.text(),
          RegexConstants.RANDOM_FLOAT_BETWEEN_ONE_AND_ZERO
        );
      }
    );

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{backspace}");
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{backspace}");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTypingBackspaceKeyTwiceOnRandomNumber) => {
        assert.equal(
          $displayAfterTypingBackspaceKeyTwiceOnRandomNumber.text(),
          numberDisplayedByRandom
        );
        assert.equal(
          $displayAfterTypingBackspaceKeyTwiceOnRandomNumber.text().length,
          numberDisplayedByRandomLength
        );
      }
    );
  });
});
