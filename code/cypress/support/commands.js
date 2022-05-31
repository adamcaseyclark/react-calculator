// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { LocatorConstants } from "../constants/locators";
import { RegexConstants } from "../constants/regex";

let NUMBER_OF_ATTEMPTS = 3;
let PRINT_MESSAGES_TO_CONSOLE = true;

// METHOD CLICKS ON CLEAR BY RECOGNIZED LETTER DISPLAYED (C)
// RECOGNIZING VALUE IS LISTED AS EXPECTED
// THEN CLICKS ON CLEAR AGAIN BY RECOGNIZING LETTER DISPLAYED (AC)
// AND VERIFYING DISPLAY NOW HAS "0" DISPLAYED

Cypress.Commands.add(
  "performClearingProcessAndVerifyCalculatorDisplayValues",
  (valueDisplayedWhenClearingProcessBegins) => {
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterClearingOnce) => {
        cy.wrap($displayAfterClearingOnce).should(
          "have.text",
          valueDisplayedWhenClearingProcessBegins
        );

        cy.get(LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT)
          .contains("C")
          .click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterClearingOnce) => {
            cy.wrap($displayAfterClearingOnce).should(
              "have.text",
              valueDisplayedWhenClearingProcessBegins
            );

            cy.get(LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT)
              .contains("AC")
              .click();

            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAfterClearingTwice) => {
                cy.wrap($displayAfterClearingTwice).should("have.text", "0");
              }
            );
          }
        );
      }
    );
  }
);

Cypress.Commands.add(
  "checkTextAndClearAgain",
  (objectWithText, textToBePresent) => {
    if (Cypress.env("KNOWN_BUG_CLEARING_DATA_ONLY_HAPPENING_IN_CYPRESS")) {
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        if (
          objectWithText.text() !== textToBePresent &&
          $clearKeyDisplayedText.text() === "AC"
        ) {
          cy.get(LocatorConstants.GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT)
            .contains(RegexConstants.AC_BUT_NOT_C)
            .click();

          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayOfNumberWithDecimalPoint) => {
              cy.wrap($displayOfNumberWithDecimalPoint).should(
                "have.text",
                textToBePresent
              );
            }
          );
        }
      });
    }
  }
);

Cypress.Commands.add(
  "waitForTextToChange",
  (elementThatHousesTextToChange, textToWaitForToDisappear, counter = 0) => {
    cy.get(elementThatHousesTextToChange).then(
      ($displayThatHousesTextToChange) => {
        if (
          $displayThatHousesTextToChange.text() === textToWaitForToDisappear &&
          counter < NUMBER_OF_ATTEMPTS &&
          NUMBER_OF_ATTEMPTS++
        ) {
          cy.waitForTextToChange(
            elementThatHousesTextToChange,
            textToWaitForToDisappear,
            counter
          );
        } else if (
          $displayThatHousesTextToChange.text() === textToWaitForToDisappear &&
          counter === NUMBER_OF_ATTEMPTS
        ) {
          assert.isOk(
            false,
            `display still has text ${textToWaitForToDisappear} after ${counter} attempts, failing test`
          );
        }
      }
    );
  }
);

Cypress.Commands.add("ConfirmationNoSelectedKeysArePresent", () => {
  cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should("exist");
  cy.get(LocatorConstants.DIVISION_KEY_NOT_SELECTED).should("exist");
  cy.get(LocatorConstants.MULTIPLICATION_KEY_NOT_SELECTED).should("exist");
  cy.get(LocatorConstants.RECALL_MEMORY_KEY_NOT_SELECTED).should("exist");
  cy.get(LocatorConstants.SHIFT_KEY_NOT_SELECTED).should("exist");
  cy.get(LocatorConstants.SUBTRACTION_KEY_NOT_SELECTED).should("exist");
  cy.get(LocatorConstants.X_TO_THE_POWER_OF_Y_NOT_SELECTED).should("exist");
  cy.get(LocatorConstants.Y_TO_THE_POWER_OF_X_NOT_SELECTED).should("exist");
});

Cypress.Commands.add("NoOperationKeyIsCurrentlySelected", () => {
  cy.get(LocatorConstants.DIVISION_KEY_NOT_SELECTED).should("exist");
  cy.get(LocatorConstants.MULTIPLICATION_KEY_NOT_SELECTED).should("exist");
  cy.get(LocatorConstants.SUBTRACTION_KEY_NOT_SELECTED).should("exist");
  cy.get(LocatorConstants.ADDITION_KEY_NOT_SELECTED).should("exist");
});

Cypress.Commands.add("waitForElementToNotBePresent", (element) => {
  cy.get(LocatorConstants.DOCUMENT_BODY).then(($body) => {
    if ($body.find(element).length) {
      cy.log(`${element} Is Still Present, Waiting....`);
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
      cy.waitForElementToNotBePresent(element);
    } else {
      cy.log(`${element} Is No Longer Present....`);
    }
  });
});

Cypress.Commands.add("waitForElementVisible", (element) => {
  cy.get(LocatorConstants.DOCUMENT_BODY).then(($body) => {
    if ($body.find(element).length) {
      cy.log(`${element} Is Present, Moving On...`);
    } else {
      cy.log(`${element} Is Not Present Yet, Waiting....`);
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
      cy.waitForElementVisible(element);
    }
  });
});

Cypress.Commands.add("printMessage", (message) => {
  if (PRINT_MESSAGES_TO_CONSOLE) cy.log(message);
});
