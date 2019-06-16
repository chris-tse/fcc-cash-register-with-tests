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
    
    // Check for early exit conditions
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
    let reverseCid = cid.reverse(); // reverse cash in drawer to start from largest denomination first

    // Keep going while there is change due left and still possible to find change
    while (changeDue > 0  && changeFound) {
        changeFound = false;

        reverseCid.forEach((denom, index, arr) => {
            let denomValue = values[denom[0]]; // get current denomination value from dictionary
            let changeGiven = [denom[0], 0];

            while (changeDue >= denomValue && denom[1] > 0) {
                // Subtract current denomination value from remaining change due and cash in drawer
                arr[index][1] -= denomValue;
                changeDue -= denomValue;

                // Round to nearest hundredth due to floating point errors
                // likely to cause bugs with more complex cases
                changeDue = Math.round(100 * changeDue) / 100; 
                changeGiven[1] += denomValue;

                // Flag another pass
                changeFound = true;
            }

            // If change is given using current denomination push it into change array
            if (changeGiven[1] > 0)
                change.push(changeGiven);
        });
        
    }

    let status;

    if (changeDue === 0)
        return { status: 'OPEN', change };
    else {
        return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }
}

/**
 * Returns total amount of money in a money array
 * @param {array} money Array for cid or change
 */
export function sumMoney(money) {
    return money.reduce((acc, next) => acc + next[1], 0);
}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);