import { LocatorConstants } from "../../../constants/locators";
import { MessageConstants } from "../../../constants/messages";
import { LogConstants } from "../../../constants/log";

describe("Natural Logarithm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterLoading) => {
      cy.wrap($displayAfterLoading).should("have.text", "0");
      cy.get(LocatorConstants.CLEAR_KEY).then(($clearKeyDisplayedText) => {
        cy.wrap($clearKeyDisplayedText).should("have.text", "AC");
      });
    });
  });

  it("0 Yields Message To User - Not A Number", () => {
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.CLEAR_KEY).then(($naturalLogarithmKeyText) => {
      assert.equal($naturalLogarithmKeyText.text(), "C");
    });

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterSelectingZero) => {
        cy.wrap($displayAfterSelectingZero).should("have.text", "0");
      }
    );

    cy.get(LocatorConstants.NATURAL_LOGARITHM_KEY).then(
      ($naturalLogarithmKeyText) => {
        cy.get(LocatorConstants.NATURAL_LOGARITHM_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterSelectingTheNaturalLogarithmOnZero) => {
            cy.wrap($naturalLogarithmKeyText).should(
              "have.text",
              LogConstants.NATURAL_LOG
            );

            cy.wrap($displayAfterSelectingTheNaturalLogarithmOnZero).should(
              "have.text",
              MessageConstants.NOT_A_NUMBER
            );
          }
        );
      }
    );
  });
});
