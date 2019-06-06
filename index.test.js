import { checkCashRegister, sumMoney } from './index';

describe('sum money', () => {
    it('returns a number', () => {
        expect(typeof sumMoney([["PENNY", 1.01], ["NICKEL", 2.05]])).toBe('number');
    });

    it('returns correct amount', () => {
        expect(sumMoney([["PENNY", 1.01], ["NICKEL", 2.05]])).toBeCloseTo(3.06);
    });
});

describe('cash register', () => {
    it('returns an object', () => {
        expect(typeof checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])).toBe('object');
    });

    it('returns open status if able to return change', () => {
        let evaluated = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
        let expected = { status: "OPEN", change: [["QUARTER", 0.5]] };

        expect(evaluated).toEqual(expected);
    });

    it('returns closed with cid as change if change due is equal to cid', () => {
        let evaluated = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
        let expected = {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]};

        expect(evaluated).toEqual(expected);
    });

    it('returns insufficient funds and empty array if unable to return exact change or cid less than change due', () => {
        let evaluated = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
        let expected = {status: "INSUFFICIENT_FUNDS", change: []};

        expect(evaluated).toEqual(expected);
    })
});

