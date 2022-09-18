import { LocatorConstants } from "../../../../constants/locators";

describe("Measurement In Radians Display", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
        cy.get(LocatorConstants.MEASUREMENT_DISPLAY).then(
          ($displayMeasureAsDefault) => {
            cy.wrap($displayMeasureAsDefault).should("have.text", "");
            cy.get(LocatorConstants.TOGGLE_MEASUREMENT_KEY).then(
              ($measurementDisplayText) => {
                cy.wrap($measurementDisplayText).should("have.text", "Rad");
              }
            );
          }
        );
      });
    });
  });

  it("Using Radians Must Be Selected By User, Key Reflects Change & Is Displays In Output", () => {
    cy.get(LocatorConstants.TOGGLE_MEASUREMENT_KEY).click();

    cy.get(LocatorConstants.MEASUREMENT_DISPLAY).then(
      ($displayAfterTogglingMeasurement) => {
        cy.get(LocatorConstants.TOGGLE_MEASUREMENT_KEY).then(
          ($measurementDisplayedOnKey) => {
            cy.wrap($displayAfterTogglingMeasurement).should(
              "have.text",
              "Rad"
            );
            cy.wrap($measurementDisplayedOnKey).should("have.text", "Deg");
          }
        );
      }
    );
  });
});
