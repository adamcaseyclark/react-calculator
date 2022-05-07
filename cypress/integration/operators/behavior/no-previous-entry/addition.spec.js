import { LocatorConstants } from "../../constants/locators";

describe("Addition Operator Functionality", () => {
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

  it("Will Have No Previous Value Display And Default Zero For Current", () => {
    cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
      ($previousValueDisplayOnPageLoad) => {
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($currentValueDisplayOnPageLoad) => {
            cy.wrap($previousValueDisplayOnPageLoad).should("have.text", "");
            cy.wrap($currentValueDisplayOnPageLoad).should("have.text", "0");
          }
        );
      }
    );
  });

  it("Will Create A Previous Value And Display When Operator Is Added", () => {
    cy.get(LocatorConstants.ONE_KEY).click();
    cy.get(LocatorConstants.TWO_KEY).click();
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.FIVE_KEY).click();

    cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
      ($previousValueDisplayAfter12345Added) => {
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($currentValueDisplayAfter12345Added) => {
            cy.wrap($previousValueDisplayAfter12345Added).should(
              "have.text",
              ""
            );
            cy.wrap($currentValueDisplayAfter12345Added).should(
              "have.text",
              "12345"
            );

            cy.get(LocatorConstants.ADDITION_KEY).click();

            cy.get(LocatorConstants.PREVIOUSLY_DISPLAYED_VALUE).then(
              ($previousValueDisplayAfterAdditionKey) => {
                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                  ($currentValueDisplayAfterAdditionKey) => {
                    cy.wrap($previousValueDisplayAfterAdditionKey).should(
                      "have.text",
                      "12345"
                    );
                    cy.wrap($currentValueDisplayAfterAdditionKey).should(
                      "have.text",
                      "0"
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });

  it("Will Add Previous And Current Value Together", () => {});

  it("", () => {});
});
