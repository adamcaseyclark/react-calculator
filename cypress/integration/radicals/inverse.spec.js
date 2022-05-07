import { LocatorConstants } from "../../constants/locators";
import { MessageConstants } from "../../constants/messages";

describe("Inverse Key (1/x) Functionality", () => {
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

  it("Selecting The Inverse Key On A Whole Number Will Return A Decimal Representation Of The Inverse", () => {
    cy.get(LocatorConstants.FOUR_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAdding4) => {
      cy.wrap($displayAfterAdding4).should("have.text", "4");
      cy.get(LocatorConstants.INVERSE_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(
        ($displayAfterSelectingInverseOf4) => {
          cy.wrap($displayAfterSelectingInverseOf4).should("have.text", "0.25");
        }
      );
    });
  });

  // it("Selecting The Inverse Key On A Decimal Will Return A Whole Number Representation Of Inverse", () => {
  //   cy.get(LocatorConstants.DECIMAL_KEY).click();
  //   cy.get(LocatorConstants.TWO_KEY).click();
  //   cy.get(LocatorConstants.FIVE_KEY).click();
  //   cy.get(LocatorConstants.DISPLAYED_VALUE).then(
  //     ($displayAfterAddingZeroPointTwoFive) => {
  //       cy.wrap($displayAfterAddingZeroPointTwoFive).should(
  //         "have.text",
  //         "0.25"
  //       );
  //       cy.get(LocatorConstants.INVERSE_KEY).click();
  //       cy.get(LocatorConstants.DISPLAYED_VALUE).then(
  //         ($displayAfterSelectingInverseOnZeroPointTwoFive) => {
  //           cy.wrap($displayAfterSelectingInverseOnZeroPointTwoFive).should(
  //             "have.text",
  //             "4"
  //           );
  //         }
  //       );
  //     }
  //   );
  // });

  it("Not A Number Message Displays When No Value Is Entered Before", () => {
    cy.get(LocatorConstants.INVERSE_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayWhenNoValueEnteredBeforeInverseSelected) => {
        cy.wrap($displayWhenNoValueEnteredBeforeInverseSelected).should(
          "have.text",
          MessageConstants.NOT_A_NUMBER
        );
      }
    );
  });
});
