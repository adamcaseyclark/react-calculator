import { LocatorConstants } from "../constants/locators";
import { MessageConstants } from "../constants/messages";

describe("Percentage Key Functionality", () => {
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

    // it("Formatted Correctly When Input Is Zero", () => {
    //   cy.get(LocatorConstants.PERCENTAGE_KEY).click();
    //   cy.get(LocatorConstants.DISPLAYED_VALUE).then(
    //     ($displayAfterEnteringZero) => {
    //       cy.wrap($displayAfterEnteringZero).should(
    //         "have.text",
    //         "0"
    //       );
    //     }
    //   );
    // });

    it("Formatted Correctly When Input Is A Single Digit", () => {
        cy.get(LocatorConstants.FOUR_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering4) => {
            cy.wrap($displayAfterEntering4).should("have.text", "4");
            cy.get(LocatorConstants.PERCENTAGE_KEY).click();
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                ($displayAfterEntering4AndPercentageKey) => {
                    cy.wrap($displayAfterEntering4AndPercentageKey).should(
                        "have.text",
                        "0.04"
                    );
                }
            );
        });
    });

    it("Formatted Correctly When Input Is A 3 Digits", () => {
        cy.get(LocatorConstants.THREE_KEY).click();
        cy.get(LocatorConstants.THREE_KEY).click();
        cy.get(LocatorConstants.THREE_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterEntering333) => {
                cy.wrap($displayAfterEntering333).should("have.text", "333");
                cy.get(LocatorConstants.PERCENTAGE_KEY).click();
                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                    ($displayAfterEntering333AndPercentageKey) => {
                        cy.wrap($displayAfterEntering333AndPercentageKey).should(
                            "have.text",
                            "3.33"
                        );
                    }
                );
            }
        );
    });

    it("Will Have No Effect Without A Value Entered", () => {
        cy.get(LocatorConstants.PERCENTAGE_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterNotANumberMessageAndAllClear) => {
                cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
                    "have.text",
                    "0"
                );
            }
        );
    });

    it("Not A Number Message Will Persist, Is Not Cleared By Selecting Percentage", () => {
        cy.get(LocatorConstants.BASE_TEN_LOGARITHM_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterSelectingBase10On0) => {
                cy.wrap($displayAfterSelectingBase10On0).should(
                    "have.text",
                    MessageConstants.NOT_A_NUMBER
                );
                cy.get(LocatorConstants.PERCENTAGE_KEY).click();
                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                    ($displayAfterSelectingNotANumberMessageAndPercentageKey) => {
                        cy.wrap(
                            $displayAfterSelectingNotANumberMessageAndPercentageKey
                        ).should("have.text", MessageConstants.NOT_A_NUMBER);
                        cy.wrap(
                            $displayAfterSelectingNotANumberMessageAndPercentageKey
                        ).should("not.have.text", "Not a numb.er");
                    }
                );
            }
        );
    });
});
