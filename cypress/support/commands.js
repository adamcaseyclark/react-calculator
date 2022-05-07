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
import { NumberConstants } from "../constants/numbers";

let NUMBER_OF_ATTEMPTS = 3;
let PRINT_MESSAGES_TO_CONSOLE = true;

Cypress.Commands.add("waitForElementToNotBePresent", (child, name = null) => {
  cy.get("Body").then(($body) => {
    if ($body.find(child).length) {
      cy.log(`${name} Is Still Present, Waiting....`);
      cy.wait(1000);
      cy.waitForElementToNotBePresent(child, name);
    } else {
      cy.log(`${name || child} Is No Longer Present....`);
    }
  });
});

Cypress.Commands.add("waitForElementVisible", (child, name = null) => {
  cy.get("Body").then(($body) => {
    if ($body.find(child).length) {
      cy.log(`${name} Is Present, Moving On...`);
    } else {
      cy.log(`${name || child} Is Not Present Yet, Waiting....`);
      cy.wait(1000);
      cy.waitForElementVisible(child, name);
    }
  });
});

Cypress.Commands.add("printMessage", (message) => {
  if (PRINT_MESSAGES_TO_CONSOLE) cy.log(message);
});

Cypress.Commands.add("waitForCalculator", (counter = 0) => {
  cy.get("Body").then(($body) => {
    if (
      $body.find(LocatorConstants.CALCULATOR).length === 0 &&
      counter < NUMBER_OF_ATTEMPTS &&
      NUMBER_OF_ATTEMPTS++
    ) {
      cy.printMessage("calculator visible not visible, retrying....");
      cy.waitForCalculator();
    } else if (
      $body.find(LocatorConstants.CALCULATOR).length === 0 &&
      counter === NUMBER_OF_ATTEMPTS
    ) {
      assert.isOk(
        false,
        `calculator is not present after ${NUMBER_OF_ATTEMPTS} attempts, breaking test`
      );
    } else if ($body.find(LocatorConstants.CALCULATOR).length === 1) {
      cy.printMessage("calculator is visible, moving forward....");
    }
  });
});

Cypress.Commands.add("clickOnKeyAndVerifyCalculatorStillPresent", (locator) => {
  cy.get(locator).click();
  cy.waitForCalculator();
});
