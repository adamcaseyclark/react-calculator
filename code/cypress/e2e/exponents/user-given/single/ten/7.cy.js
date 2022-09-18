import { LocatorConstants } from "../../../../../constants/locators";

describe("10 Raised To The Displayed Number Key (User Given Exponent)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("Will Raise 10 To The Power Of The Entered Value (7)", () => {
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelecting7Key) => {
        cy.wrap($displayAfterSelecting7Key).should("have.text", "7");
        cy.get(LocatorConstants.TEN_TO_THE_POWER_OF).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterRaising10ToThePowerOf7) => {
            cy.wrap($displayAfterRaising10ToThePowerOf7).should(
              "have.text",
              "10000000"
            );
          }
        );
      }
    );
  });
});
