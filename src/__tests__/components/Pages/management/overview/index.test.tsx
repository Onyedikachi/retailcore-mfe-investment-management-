import { updateInvestmentTabs } from "../../../../../components/pages/management/overview/index"
describe('updateInvestmentTabs', () => {

    // Returns an array of objects with updated 'amount' and 'totalValue' properties.
    it('should return an array of objects with updated amount and totalValue properties', () => {
        const data = {
            All: { count: 10, totalValue: 5000 },
            A: { count: 5, totalValue: 2500 },
            L: { count: 5, totalValue: 2500 },
        };

        const tabs = [
            {
                title: "All Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<InvestmentSvg />",
            },
            {
                title: "Active Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<UserSvg />",
            },
            {
                title: "Liquidated Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<WithdrawSvg />",
            },
        ];

        const updatedTabs = updateInvestmentTabs(data, tabs);

        expect(updatedTabs).toEqual([
            {
                title: "All Investments",
                amount: " 5000",
                totalValue: "10 total investments",
                icon: "<InvestmentSvg />",
            },
            {
                title: "Active Investments",
                amount: " 2500",
                totalValue: "5 total investments",
                icon: "<UserSvg />",
            },
            {
                title: "Liquidated Investments",
                amount: " 2500",
                totalValue: "5 total investments",
                icon: "<WithdrawSvg />",
            },
        ]);
    });

    // Updates 'amount' property with the total value of investments for each tab.
    it('should update amount property with the total value of investments for each tab', () => {
        const data = {
            All: { count: 10, totalValue: 5000 },
            A: { count: 5, totalValue: 2500 },
            L: { count: 5, totalValue: 2500 },
        };

        const tabs = [
            {
                title: "All Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<InvestmentSvg />",
            },
            {
                title: "Active Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<UserSvg />",
            },
            {
                title: "Liquidated Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<WithdrawSvg />",
            },
        ];

        const updatedTabs = updateInvestmentTabs(data, tabs);

        expect(updatedTabs[0].amount).toBe(" 5000");
        expect(updatedTabs[1].amount).toBe(" 2500");
        expect(updatedTabs[2].amount).toBe(" 2500");
    });

    // Updates 'totalValue' property with the total count of investments for each tab.
    it('should update totalValue property with the total count of investments for each tab', () => {
        const data = {
            All: { count: 10, totalValue: 5000 },
            A: { count: 5, totalValue: 2500 },
            L: { count: 5, totalValue: 2500 },
        };

        const tabs = [
            {
                title: "All Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<InvestmentSvg />",
            },
            {
                title: "Active Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<UserSvg />",
            },
            {
                title: "Liquidated Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<WithdrawSvg />",
            },
        ];

        const updatedTabs = updateInvestmentTabs(data, tabs);

        expect(updatedTabs[0].totalValue).toBe("10 total investments");
        expect(updatedTabs[1].totalValue).toBe("5 total investments");
        expect(updatedTabs[2].totalValue).toBe("5 total investments");
    });

    // Returns an empty array when the input 'tabs' array is empty.
    it('should return an empty array when the input tabs array is empty', () => {
        const data = {
            All: { count: 10, totalValue: 5000 },
            A: { count: 5, totalValue: 2500 },
            L: { count: 5, totalValue: 2500 },
        };

        const tabs = [];

        const updatedTabs = updateInvestmentTabs(data, tabs);

        expect(updatedTabs).toEqual([]);
    });

    // Returns an array of objects with 'amount' property set to '0.00' and 'totalValue' property set to '0 total investments' when the input 'tabs' array is empty.
    it('should return an array of objects with amount property set to 0.00 and totalValue property set to 0 total investments when the input tabs array is empty', () => {
        const data = {
            All: { count: 10, totalValue: 5000 },
            A: { count: 5, totalValue: 2500 },
            L: { count: 5, totalValue: 2500 },
        };

        const tabs = [];

        const updatedTabs = updateInvestmentTabs(data, tabs);

        expect(updatedTabs).toEqual([]);
    });

    // Returns an array of objects with the same length as the input 'tabs' array.
    it('should return an array of objects with the same length as the input tabs array', () => {
        const data = {
            All: { count: 10, totalValue: 5000 },
            A: { count: 5, totalValue: 2500 },
            L: { count: 5, totalValue: 2500 },
        };

        const tabs = [
            {
                title: "All Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<InvestmentSvg />",
            },
            {
                title: "Active Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<UserSvg />",
            },
            {
                title: "Liquidated Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<WithdrawSvg />",
            },
        ];

        const updatedTabs = updateInvestmentTabs(data, tabs);

        expect(updatedTabs.length).toBe(tabs.length);
    });
});
