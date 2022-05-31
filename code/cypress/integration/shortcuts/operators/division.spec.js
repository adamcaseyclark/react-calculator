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

  it("Typing '/' Chooses The Division Operator", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();

    cy.get(LocatorConstants.DOCUMENT_BODY).type("{/}");
    cy.get(LocatorConstants.DIVISION_KEY_WHEN_SELECTED).should("exist");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterTyping123DivisionSign) => {
        assert.equal($displayAfterTyping123DivisionSign.text(), "123");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterTyping123DivisionSign) => {
          cy.wrap($previouslyDisplayedAfterTyping123DivisionSign).should(
            "have.text",
            'previous="" operator="÷" lastKey="÷" calculationInProgress="" audit="" shortcutKeys="/"'
          );
        }
      );
    }
  });
});
