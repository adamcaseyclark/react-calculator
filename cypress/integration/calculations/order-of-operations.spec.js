import { LocatorConstants } from "../../constants/locators";
import { MessageConstants } from "../../constants/messages";

describe("Order Of Operations - Parentheses", () => {
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

  it("Calc Respects Order Of Ops, Parenthesis & Operators Do Not Appear In Output (4-2)*2=4", () => {
    cy.get(LocatorConstants.RIGHT_PARENTHESIS_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
      ($displayAfterAddingRightParenthesis) => {
        cy.wrap($displayAfterAddingRightParenthesis).should("have.text", "0");
        cy.get(LocatorConstants.FOUR_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
          ($displayAfterAdding4) => {
            cy.wrap($displayAfterAdding4).should("have.text", "4");
            cy.get(LocatorConstants.SUBTRACTION_KEY).click();

            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
              ($displayAfterAddingSubtraction) => {
                cy.wrap($displayAfterAddingSubtraction).should(
                  "have.text",
                  "0"
                );

                cy.get(LocatorConstants.TWO_KEY).click();
                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                  ($displayAfterAddingSubtraction) => {
                    cy.wrap($displayAfterAddingSubtraction).should(
                      "have.text",
                      "2"
                    );

                    cy.get(LocatorConstants.LEFT_PARENTHESIS_KEY).click();
                    cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                      ($displayAfterAddingSubtraction) => {
                        cy.wrap($displayAfterAddingSubtraction).should(
                          "have.text",
                          "2"
                        );

                        cy.get(LocatorConstants.MULTIPLICATION_KEY).click();
                        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                          ($displayAfterAddingSubtraction) => {
                            cy.wrap($displayAfterAddingSubtraction).should(
                              "have.text",
                              "0"
                            );

                            cy.get(LocatorConstants.TWO_KEY).click();
                            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                              ($displayAfterAddingSubtraction) => {
                                cy.wrap($displayAfterAddingSubtraction).should(
                                  "have.text",
                                  "2"
                                );

                                cy.get(LocatorConstants.EQUALS_KEY);
                                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                                  ($displayAfterAddingSubtraction) => {
                                    cy.wrap(
                                      $displayAfterAddingSubtraction
                                    ).should("have.text", "4");
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
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
});
