import { LocatorConstants } from "../../../constants/locators";

describe("Cubed key (x^3) on Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "0");
    });
  });

  it("Selecting Cubed Key With No Displayed Value Will Have No Effect On Calculator", () => {
    cy.get(LocatorConstants.CUBE_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterCubingDefaultZero) => {
        cy.wrap($displayAfterCubingDefaultZero).should("have.text", "0");
        cy.get(LocatorConstants.CLEAR_KEY).then(($textDisplayOnAllClearKey) => {
          cy.wrap($textDisplayOnAllClearKey).should("have.text", "AC");
        });
      }
    );
  });
});
