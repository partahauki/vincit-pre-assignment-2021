export function longestDownwardTrend(priceInformation) {
    let counter = 0
    let max = 0
    let streakEnd = false
    priceInformation.reduce((prev, curr) => {
        if (curr["value"] < prev["value"]) {
            counter++
            if(counter > max) {
                max = counter
                streakEnd = curr["date"]
            }
        }
        else {
            counter = 0
        }
        return curr
    })

    return {"maxStreak" : max, "streakEnds" : streakEnd}
}

export function highestTradingVolume(volumeData) {
    let maxVolume = 0
    let maxIndex = 0
    for (const [index, volume] of volumeData.entries()) {
        if (volume["value"] > maxVolume) {
            
            maxVolume = volume["value"]
            maxIndex = index
            
        }
    }

    return {"maxVolume" : maxVolume, "date" : volumeData[maxIndex]["date"]}
}