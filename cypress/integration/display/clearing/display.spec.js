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

  it("Added Zero To ", () => {
    // DISPLAY IS ZERO
    // AC DISPLAYED
    // ADD ZERO
    // C DISPLAYED
    // CLEAR ONCE (C)
    // DISPLAYS (AC)
  });

  it("Clear Key Changes From AC To C When A Previous Value Is Present", () => {
    // ADD 4, AC GOES TO C
    // ADD 4
    // ADD NEGATIVE
    // CLEAR ONCE (C) - MOVES TO (AC)
    // DISPLAY REMAINS -44
    // ALL CLEAR ONCE (AC)
    // DISPLAYS ZERO
  });
});
