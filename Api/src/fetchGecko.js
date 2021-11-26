import fetch from 'node-fetch'

const UNIXTIME_HOUR = 3600000
const UNIXTIME_12HOURS = 43200000
const UNIXTIME_24HOURS = 86400000

function validateDates(dates) {
    for (const date of dates) {
        if (isNaN(Date.parse(date)) === true) { 
            return {"error" : "Provide valid dates with YYYY-MM-DD -format!"}
        }
    }

    if (Date.parse(dates[0]) > Date.parse(dates[1])) {
        return {"error" : "Dates must be provided in a chronological order!"}
    }

    return true
}

async function fetchFromGecko(startUnixtime, endUnixtime) {
    let jsonData = null
    try{
        const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/`
        + `range?vs_currency=eur&from=${(startUnixtime / 1000)}&to=${(endUnixtime + UNIXTIME_HOUR) / 1000}`

        const response = await fetch(url)
        jsonData = await response.json()
    }
    catch (e) {
        console.error(e)
        return {"error" : "An error occured while server was fetching data."}
    }

    return jsonData
}

function parseDailyData(startUnixtime, endUnixtime, data) {
    let timestamps = []
    for(const timestamp of data) {
        timestamps.push(timestamp[0])
    }

    endUnixtime += UNIXTIME_HOUR
    startUnixtime += UNIXTIME_24HOURS  

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

export async function getDailyPrices(startDate, endDate) { 
    const validation = validateDates([startDate, endDate])
    if (validation !== true) {
        return validation
    }
    
    const startUnixtime = Date.parse(startDate)
    const endUnixtime = Date.parse(endDate) 

    const jsonData = await fetchFromGecko(startUnixtime, endUnixtime)

    if (jsonData["prices"].length === 0) {
        return {"error": `No prices were found for date range ${startDate} - ${endDate}`}
    }
    
    const dailyPrices = parseDailyData(startUnixtime, endUnixtime, jsonData["prices"])

    return dailyPrices
}

export async function getDailyVolumes(startDate, endDate) {
    const validation = validateDates([startDate, endDate])
    if (validation !== true) {
        return validation
    }
    
    const startUnixtime = Date.parse(startDate)
    const endUnixtime = Date.parse(endDate) 

    const jsonData = await fetchFromGecko(startUnixtime, endUnixtime)

    if (jsonData["total_volumes"].length === 0) {
        return {"error": `No volumes were found for date range ${startDate} - ${endDate}`}
    }
    
    const dailyVolumes = parseDailyData(startUnixtime, endUnixtime, jsonData["total_volumes"])

    return dailyVolumes
}
