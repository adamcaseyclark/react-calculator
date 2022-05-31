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

  it("Alternating Keyboard Enter And Equals", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{enter}");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayCheckOne) => {
      cy.wrap($displayCheckOne).should("have.text", "2");
    });

    cy.get(LocatorConstants.ADDITION_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{=}");
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{=}");
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{enter}");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayCheckTwo) => {
      cy.wrap($displayCheckTwo).should("have.text", "11");
    });

    cy.get(LocatorConstants.SUBTRACTION_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{enter}");
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{enter}");
    cy.get(LocatorConstants.DOCUMENT_BODY).type("{=}");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLastEquals) => {
      cy.wrap($displayAfterLastEquals).should("have.text", "-4");
    });
  });
});
