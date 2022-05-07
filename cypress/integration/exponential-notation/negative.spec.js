import { LocatorConstants } from "../../../../constants/locators";
import { MessageConstants } from "../../../../constants/messages";

describe("Exponential Notation Calculation (EE): Negative Exponent", () => {
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

    // TODO: NEGATIVE EXPONENTS & `0 e 0` CALCULATION

    it("", () => {
        cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayWhenSelectingExponentialNotationOnZero) => {
                cy.wrap($displayWhenSelectingExponentialNotationOnZero).should(
                    "have.text",
                    "0 e 0"
                );
            }
        );
    });

    it("Displayed Value Will Become At Time Of Selecting Value Will Become The Coefficient", () => {
        cy.get(LocatorConstants.TWO_KEY).click();
        cy.get(LocatorConstants.TWO_KEY).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(($displayAfterEntering22) => {
            cy.wrap($displayAfterEntering22).should("have.text", "22");
            cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
            cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                ($displayWhenSelectingExponentialNotationOn22) => {
                    cy.wrap($displayWhenSelectingExponentialNotationOn22).should(
                        "have.text",
                        "22 e 0"
                    );
                }
            );
        });
    });

    it("Displayed Value Will Become At Time Of Selecting Value Will Become The Coefficient", () => {
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayBeforeTestStarting) => {
                cy.wrap($displayBeforeTestStarting).should("have.text", "0");
                cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                    ($displayWhenSelectingExponentialNotationWithNoInput) => {
                        cy.wrap($displayWhenSelectingExponentialNotationWithNoInput).should(
                            "have.text",
                            "0 e 0"
                        );

                        cy.get(LocatorConstants.FIVE_KEY).click();
                        cy.get(LocatorConstants.FIVE_KEY).click();
                        cy.get(LocatorConstants.FIVE_KEY).click();
                        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                            ($displayWhenAfterAdding555ToTheNotation) => {
                                cy.wrap($displayWhenAfterAdding555ToTheNotation).should(
                                    "have.text",
                                    "0 e 555"
                                );
                            }
                        );
                    }
                );
            }
        );
    });

    it("Resolving Notation To Whole Number With Equals", () => {
        cy.get(LocatorConstants.ONE_KEY).click();
        cy.get(LocatorConstants.DECIMAL_KEY).click();
        cy.get(LocatorConstants.TWO_KEY).click();
        cy.get(LocatorConstants.EXPONENTIAL_NOTATION_KEY).click();
        cy.get(LocatorConstants.FIVE_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterEntering1Point2e5) => {
                cy.wrap($displayAfterEntering1Point2e5).should("have.text", "1.2 e 5");

                cy.get(LocatorConstants.EQUALS_KEY).click();
                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                    ($displayAfterResolving1Point2e5) => {
                        cy.wrap($displayAfterResolving1Point2e5).should(
                            "have.text",
                            "120000"
                        );
                    }
                );
            }
        );
    });
});
