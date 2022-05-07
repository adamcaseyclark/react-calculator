import { LocatorConstants } from "../../../../constants/locators";

describe("2 Raised To The Displayed Number Key (User Given Exponent)", () => {
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

    it("Default Value Entered (0) Will Yield An Answer Of 1", () => {
        cy.get(LocatorConstants.TEN_TO_THE_POWER_OF).click();
        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterNotANumberMessageAndAllClear) => {
                cy.wrap($displayAfterNotANumberMessageAndAllClear).should(
                    "have.text",
                    "1"
                );
            }
        );
    });

    it("Will Raise 2 To The Power Of The Entered Value", () => {
        cy.get(LocatorConstants.SEVEN_KEY).click();
        cy.get(LocatorConstants.SHIFT_KEY).click();
        cy.get(LocatorConstants.SHIFT_KEY_WHEN_SELECTED).should("exist");

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterSelecting7Key) => {
                cy.wrap($displayAfterSelecting7Key).should("have.text", "7");
                cy.get(LocatorConstants.TWO_TO_THE_POWER_OF).click();
                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                    ($displayAfterSelectingNotANumberMessageAndPercentageKey) => {
                        cy.wrap(
                            $displayAfterSelectingNotANumberMessageAndPercentageKey
                        ).should("have.text", "128");
                    }
                );
            }
        );
    });
});
