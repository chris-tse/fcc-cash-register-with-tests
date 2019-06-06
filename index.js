const values = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100,
}

/**
 * Checks if correct change is able to be returned
 * @param {number} price Price of sale
 * @param {number} cash Payment amount
 * @param {array} cid Cash in drawer
 */
export function checkCashRegister(price, cash, cid) {
    let changeDue = cash - price;
    const change = [];
    
    if (changeDue === 0) {
        return { status: "OPEN", change };
    }

    const totalCid = sumMoney(cid);

    if (totalCid === changeDue) {
        return {status: "CLOSED", change: cid};
    }

    if (totalCid < changeDue) {
        return {status: "INSUFFICIENT_FUNDS", change}
    }

    let changeFound = true;
    let reverseCid = cid.reverse();

    while (changeDue > 0) {
        changeFound = false;

        reverseCid.forEach((denom, index, arr) => {
            let denomValue = values[denom[0]]

            if (changeDue >= denomValue && denom[1] > 0) {
                arr[index][1] -= denomValue;
            }
        });
    }

    return {};
}

/**
 * Returns total amount of money in a money array
 * @param {array} money Array for cid or change
 */
export function sumMoney(money) {
    return money.reduce((acc, next) => acc + next[1], 0);
}