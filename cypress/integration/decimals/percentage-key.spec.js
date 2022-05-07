import { LocatorConstants } from "../../constants/locators";

describe("Decimal Point Key", () => {
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


    it("Display Is Cleared Of Entered Percentage When Decimal Is Selecting", () => {

        // 33 => percentage = .33 => decimal get 0.
        // .33 => decemal gets .33


        cy.get(LocatorConstants.THREE_KEY).click();
        cy.get(LocatorConstants.THREE_KEY).click();
        cy.get(LocatorConstants.PERCENTAGE_KEY).click();

        cy.get(LocatorConstants.DISPLAYED_VALUE).then(
            ($displayAfterEntered33Percent) => {
                cy.wrap($displayAfterEntered33Percent).should(
                    "have.text",
                    "0.33"
                );

                cy.get(LocatorConstants.DECIMAL_KEY).click();
                cy.get(LocatorConstants.DISPLAYED_VALUE).then(
                    ($displayAfterSelectingDecimalPoint) => {
                        cy.wrap($displayAfterSelectingDecimalPoint).should(
                            "have.text",
                            "0."
                        );
                    }
                );
            }
        );


    });
});
