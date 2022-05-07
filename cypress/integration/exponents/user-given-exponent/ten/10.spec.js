import { LocatorConstants } from "../../../constants/locators";

describe("10 Raised To The Displayed Number Key (User Given Exponent)", () => {
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

  it("No Value Entered Will Yield An Answer Of 1", () => {
    cy.get(LocatorConstants.TEN_TO_THE_POWER_OF).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterNotANumberMessageAndAllClear) => {
        cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
          "have.text",
          "1"
        );
      }
    );
  });

  it("Will Raise 10 To The Power Of The Entered Value", () => {
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelecting7Key) => {
        cy.wrap($displayAfterSelecting7Key).should("have.text", "7");
        cy.get(LocatorConstants.TEN_TO_THE_POWER_OF).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingNotANumberMessageAndPercentageKey) => {
            cy.wrap(
              $displayAfterSelectingNotANumberMessageAndPercentageKey
            ).should("have.text", "10000000");
          }
        );
      }
    );
  });

  it("Will Only Yield 4", () => {
    cy.get(LocatorConstants.TEN_TO_THE_POWER_OF).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterNotANumberMessageAndAllClear) => {
        cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
          "have.text",
          "1"
        );
      }
    );
  });
});
