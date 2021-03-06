export function longestDownwardTrend(data) {
    const prices = data[1]

    if (prices.length < 2) {
        return { warning: "Date range contained only one day, can't calculate downtrend." }
    }

    let currentStreak = 0
    let maxStreak = 0
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < prices[i - 1]) {
            currentStreak++
            if (currentStreak > maxStreak) {
                maxStreak = currentStreak
            }
        } else {
            currentStreak = 0
        }
    }

    return { maxStreak }
}

export function highestTradingVolume(data) {
    const dates = data[0]
    const volumes = data[1]

    let maxVolume = 0
    let maxIndex = 0
    for (const [index, volume] of volumes.entries()) {
        if (volume > maxVolume) {
            maxVolume = volume
            maxIndex = index
        }
    }

    return { maxVolume, date: dates[maxIndex] }
}

/*
    Searches for the most optimal day to buy and sell in a given date range,
    meaning biggest difference in buy and sell price
*/
export function timeMachine(data) {
    const dates = data[0]
    const prices = data[1]

    if (prices.length < 2) {
        return {
            warning:
            "Date range contained only one day, can't calculate profit possibilities.",
        }
    }

    let maxDifference = prices[1] - prices[0]
    let maxStartIndex = 0
    let maxEndIndex = 1
    let lowestPrice = prices[0]
    let lowestPriceIndex = 0

    for (let i = 1; i < prices.length; i++) {
        if ((prices[i] - lowestPrice) > maxDifference) {
            maxDifference = prices[i] - lowestPrice
            maxEndIndex = i
            maxStartIndex = lowestPriceIndex
        }
        if (prices[i] < lowestPrice) {
            lowestPrice = prices[i]
            lowestPriceIndex = i
        }
    }

    if (maxDifference <= 0) {
        return { warning: "Date range didn't contain any potential days to make profit." }
    }

    return { maxDifference, buyDate: dates[maxStartIndex], sellDate: dates[maxEndIndex] }
}
