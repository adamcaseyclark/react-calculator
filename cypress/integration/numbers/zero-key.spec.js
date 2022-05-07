import { LocatorConstants } from "../../constants/locators";

describe("Zero Number Key Functionality", () => {
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

  it("Selecting The Zero Key Will Display A Zero", () => {
    cy.get(LocatorConstants.ZERO_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterAddingZero) => {
        cy.wrap($displayAfterAddingZero).should("have.text", "0");
      }
    );
  });

  it("Will Not Have Preceding Zero Before Other Numbers", () => {
    cy.get(LocatorConstants.ZERO_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();
    cy.get(LocatorConstants.SEVEN_KEY).click();

    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterZeroAnd3Sevens) => {
        cy.wrap($displayAfterZeroAnd3Sevens).should("have.text", "777");
        cy.wrap($displayAfterZeroAnd3Sevens).should("not.have.text", "0777");
      }
    );
  });

  // it("Selecting Zero Key Displays 0 And Registers New '0', Not Default '0' - AC Becomes C", () => {
  //   cy.get(LocatorConstants.ZERO_KEY).click();
  //   cy.get(LocatorConstants.DISPLAYED_VALUE).then(
  //     ($displayAfterZeroSelected) => {
  //       cy.get(LocatorConstants.ALL_CLEAR_KEY).then(
  //         ($clearKeyAfterZeroSelected) => {
  //           cy.wrap($displayAfterZeroSelected).should("have.text", "0");
  //           cy.wrap($clearKeyAfterZeroSelected).should("have.text", "C");
  //           cy.wrap($clearKeyAfterZeroSelected).should("not.have.text", "AC");
  //         }
  //       );
  //     }
  //   );
  // });
});
