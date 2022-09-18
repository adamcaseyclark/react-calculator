import { LocatorConstants } from "../../constants/locators";
import { RegexConstants } from "../../constants/regex";

describe("Clearing After Adding An Operator, After Operator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Digits, Operator, Digits - Clear - New Number", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();
    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.SIX_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.EIGHT_KEY).click();

    cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");

    cy.get(LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT)
      .contains(RegexConstants.C_BUT_NOT_AC)
      .click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterClearing) => {
      cy.wrap($displayAfterClearing).should("have.text", "0");
    });

    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();

    cy.get(LocatorConstants.ADDITION_KEY_WHEN_SELECTED).should("exist");

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterTyping222) => {
      cy.wrap($displayAfterTyping222).should("have.text", "222");
    });

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterTyping222) => {
          cy.wrap($previouslyDisplayedAfterTyping222).should(
            "have.text",
            'previous="12345" operator="+" lastKey="2" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.EQUALS_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingEquals) => {
        cy.wrap($displayAfterSelectingEquals).should("have.text", "12567");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterTyping123SubtractionSign) => {
          cy.wrap($previouslyDisplayedAfterTyping123SubtractionSign).should(
            "have.text",
            'previous="222" operator="+" lastKey="=" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }

    cy.get(LocatorConstants.ADDITION_KEY).click();

    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectin777) => {
        cy.wrap($displayAfterSelectin777).should("have.text", "777");
      }
    );

    // ONLY RUNS IF CYPRESS IF `TESTING_IN_DEBUG_MODE`
    // WILL FAIL IF APPLICATION IN NOT RUNNING IN `DEBUGGING_MODE`
    if (Cypress.env("TESTING_IN_DEBUG_MODE")) {
      cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
        ($previouslyDisplayedAfterTyping777) => {
          cy.wrap($previouslyDisplayedAfterTyping777).should(
            "have.text",
            'previous="12567" operator="+" lastKey="7" calculationInProgress="" audit="" shortcutKeys=""'
          );
        }
      );
    }
  });
});
