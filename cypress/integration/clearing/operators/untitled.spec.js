import { LocatorConstants } from "../../../constants/locators";

describe("Clearing After Adding Operator", () => {
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

  it("Test", () => {
    cy.get(LocatorConstants.THREE_KEY).click();
    cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering3) => {
      cy.wrap($displayAfterEntering3).should("have.text", "3");
      cy.get(LocatorConstants.CLEAR_KEY).then(
        ($clearKeyDisplayedTextAfterEntering3) => {
          cy.wrap($clearKeyDisplayedTextAfterEntering3).should(
            "have.text",
            "C"
          );
          cy.wrap($clearKeyDisplayedTextAfterEntering3).should(
            "not.have.text",
            "AC"
          );

          cy.get(LocatorConstants.ADDITION_KEY).click();
          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterEntering3AndPlus) => {
              cy.wrap($displayAfterEntering3AndPlus).should("have.text", "3");
              cy.get(LocatorConstants.CLEAR_KEY).then(
                ($clearKeyDisplayedTextAfterEntering3AndPlus) => {
                  cy.wrap($clearKeyDisplayedTextAfterEntering3AndPlus).should(
                    "have.text",
                    "C"
                  );
                  cy.wrap($clearKeyDisplayedTextAfterEntering3).should(
                    "not.have.text",
                    "AC"
                  );

                  cy.get(LocatorConstants.CLEAR_KEY).click();
                  cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                    ($displayAfterSelectingClearOnce) => {
                      cy.wrap($displayAfterSelectingClearOnce).should(
                        "have.text",
                        "3"
                      );
                      cy.get(LocatorConstants.CLEAR_KEY).then(
                        ($clearKeyDisplayedTextAfterSelectingClearOnce) => {
                          cy.wrap(
                            $clearKeyDisplayedTextAfterSelectingClearOnce
                          ).should("have.text", "AC");
                          cy.wrap(
                            $clearKeyDisplayedTextAfterSelectingClearOnce
                          ).should("not.have.text", "C");

                          cy.get(LocatorConstants.CLEAR_KEY).click();
                          cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                            ($displayAfterSelectingClearTwice) => {
                              cy.wrap($displayAfterSelectingClearTwice).should(
                                "have.text",
                                "0"
                              );
                              cy.get(LocatorConstants.CLEAR_KEY).then(
                                (
                                  $clearKeyDisplayedTextAfterSelectingClearTwice
                                ) => {
                                  cy.wrap(
                                    $clearKeyDisplayedTextAfterSelectingClearTwice
                                  ).should("have.text", "AC");
                                  cy.wrap(
                                    $clearKeyDisplayedTextAfterSelectingClearTwice
                                  ).should("not.have.text", "C");
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
});
