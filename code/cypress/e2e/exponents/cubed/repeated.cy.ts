import { LocatorConstants } from "../../../constants/locators";

describe("Cubed key (x^3) on Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($display) => {
      cy.wrap($display).should("have.text", "0");
    });
  });

  it("Additional Selection Of Cubed Key Will Continue To Cube Displayed Number", () => {
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterAdding3) => {
      cy.wrap($displayAfterAdding3).should("have.text", "3");
      cy.get(LocatorConstants.CUBE_KEY).click();
      cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterCubing3) => {
        cy.wrap($displayAfterCubing3).should("have.text", "27");
        cy.get(LocatorConstants.CUBE_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterCubing27) => {
            cy.wrap($displayAfterCubing27).should("have.text", "19683");
            cy.get(LocatorConstants.CUBE_KEY).click();
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAfterCubing27) => {
                cy.wrap($displayAfterCubing27).should(
                  "have.text",
                  "7625597484987"
                );
              }
            );
          }
        );
      });
    });
  });
});
