import { LocatorConstants } from "../../../constants/locators";
import { MessageConstants } from "../../../constants/messages";

describe("UI Changes When Clearing Data From Calculator (AC & C)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.reload();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterReload) => {
      cy.wrap($displayAfterReload).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Clear Key Changes From AC To C When A Previous Value Is Present", () => {
    cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
      cy.wrap($clearKeyDisplayedText).should("have.text", "AC");

      cy.get(LocatorConstants.ONE_KEY).click();
      cy.get(LocatorConstants.TWO_KEY).click();
      cy.get(LocatorConstants.THREE_KEY).click();
      cy.get(LocatorConstants.FOUR_KEY).click();
      cy.get(LocatorConstants.FIVE_KEY).click();

      cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAdded12345) => {
        cy.wrap($displayAfterAdded12345).should("have.text", "12345");

        cy.get(LocatorConstants.CLEAR_KEY).then(
          ($clearKeyDisplayedTextAfterAdded12345) => {
            cy.wrap($clearKeyDisplayedTextAfterAdded12345).should(
              "have.text",
              "AC"
            );

            cy.get(LocatorConstants.ADDITION_KEY).click();
            cy.get(LocatorConstants.CLEAR_KEY).then(
              ($clearKeyDisplayedTextAfterAddedAdditionOperator) => {
                cy.wrap(
                  $clearKeyDisplayedTextAfterAddedAdditionOperator
                ).should("have.text", "C");

                cy.wrap(
                  $clearKeyDisplayedTextAfterAddedAdditionOperator
                ).should("not.have.text", "AC");
              }
            );
          }
        );
      });
    });
  });
});
