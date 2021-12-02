import fetch from 'node-fetch'

const UNIXTIME_HOUR = 3600000
const UNIXTIME_12HOURS = 43200000
const UNIXTIME_24HOURS = 86400000

async function fetchFromGecko(startUnixtime, endUnixtime) {
    let jsonData = {}
    const error = {"error" : "An error occured while server was fetching data"}
    try{
        const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/`
        + `range?vs_currency=eur&from=${(startUnixtime / 1000)}&to=${(endUnixtime + UNIXTIME_HOUR) / 1000}`

        const response = await fetch(url)
        jsonData = await response.json()
    }
    catch (e) {
        console.error(e)
        return error
    }

    if (jsonData === {}) { return error }

    return jsonData
}

/*
    Compares timestamps in data given as a parameter and returns
    values that are closest to midnight time of every day
*/
function parseDailyData(startUnixtime, endUnixtime, data) {
    let timestamps = []
    for(const timestamp of data) {
        timestamps.push(timestamp[0])
    }

    endUnixtime += UNIXTIME_HOUR
    startUnixtime += UNIXTIME_24HOURS  

    //Finds and pushes indices of the values to be returned into an array
    let indexes = [0]
    let continue_ = 1
    for (let midnightTime = startUnixtime; midnightTime < endUnixtime; midnightTime += UNIXTIME_24HOURS) { 
        for (let i = continue_; i < timestamps.length; i++) {
            if (timestamps[i] >= midnightTime) {
                if (Math.abs(timestamps[i] - midnightTime) < Math.abs(timestamps[i-1] - midnightTime)) {
                    indexes.push(i)
                }
                else { 
                    indexes.push(i - 1)
                }
                continue_ = i + 1
                break
            }
        }
    }

    //Uses the index-array to generate the return data
    let values = []
    let dates = []
    for (const i of indexes) {
        const stampOffset = data[i][0] + UNIXTIME_12HOURS
        const date = new Date(stampOffset).toISOString().slice(0,10)

        dates.push(date)
        values.push(data[i][1])
    }
    const dailyData = [dates, values]

    return dailyData
}

export async function getDailyPrices(startUnixtime, endUnixtime) {
    const jsonData = await fetchFromGecko(startUnixtime, endUnixtime)

    if(jsonData["error"]) { return jsonData }
    if (jsonData["prices"].length === 0) {
        return {"warning": `No price data were found for date range ${new Date(startUnixtime)} - ${new Date(endUnixtime)}`}
    }
    
    return parseDailyData(startUnixtime, endUnixtime, jsonData["prices"])
}

export async function getDailyVolumes(startUnixtime, endUnixtime) {
    const jsonData = await fetchFromGecko(startUnixtime, endUnixtime)

    if(jsonData["error"]) { return jsonData }
    if (jsonData["total_volumes"].length === 0) {
        return {"warning": `No volume data were found for date range ${new Date(startUnixtime)} - ${new Date(endUnixtime)}`}
    }
    
    return parseDailyData(startUnixtime, endUnixtime, jsonData["total_volumes"])
}
