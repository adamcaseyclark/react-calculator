import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Addition Operator Behavior - Will Yield Zero With No Previous Entry", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("No Previous Value Entered Will Yield 0 When `+` And `=`", () => {
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterZeroEnteredDifferentThanDefault) => {
        cy.wrap($displayAfterZeroEnteredDifferentThanDefault).should(
          "have.text",
          "0"
        );

        // TO CONFIRM AFTER ENTERING ZERO - THIS VIEWED AS A NEW VALUE ENTERED - DIFFERENT THAN DEFAULT
        cy.get(LocatorConstants.CLEAR_KEY).then(
          ($clearKeyDisplayedTextAfterZeroEnteredDifferentThanDefault) => {
            cy.wrap(
              $clearKeyDisplayedTextAfterZeroEnteredDifferentThanDefault
            ).should("have.text", "C");
            cy.wrap(
              $clearKeyDisplayedTextAfterZeroEnteredDifferentThanDefault
            ).should("not.have.text", "AC");

            cy.get(LocatorConstants.ADDITION_KEY).click();
            cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");
            cy.get(LocatorConstants.EQUALS_KEY).click();

            // DISPLAYED IS `0`, OPERATOR NOT SELECTED, CLEAR IS (AC), NOT (C)
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAfterSelectingAddAndEquals) => {
                cy.wrap($displayAfterSelectingAddAndEquals).should(
                  "not.have.text",
                  MessageConstants.NOT_A_NUMBER
                );

                cy.wrap($displayAfterSelectingAddAndEquals).should(
                  "not.have.text",
                  "NaN"
                );

                cy.wrap($displayAfterSelectingAddAndEquals).should(
                  "have.text",
                  "0"
                );
                cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should(
                  "exist"
                );
              }
            );
          }
        );
      }
    );
  });
});
