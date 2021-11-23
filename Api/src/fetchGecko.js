import fetch from 'node-fetch'

function validateDates(dates) {
    for (const date of dates) {
        if (isNaN(Date.parse(date)) === true) {
            return false
        }
    }

    return true
}

async function fetchFromGecko(startUnixtime, endUnixtime) {
    const unixtimeHour = 3600000
    let jsonData = null
    try{
        const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/`
        + `range?vs_currency=eur&from=${(startUnixtime / 1000)}&to=${(endUnixtime + unixtimeHour) / 1000}`

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

    const unixtimeDay = 86400000
    const unixtimeHour = 3600000
    endUnixtime += unixtimeHour    

    let indexes = []
    let continue_ = 0
    for (let midnightTime = startUnixtime; midnightTime < endUnixtime; midnightTime += unixtimeDay) { 
        for (let i = continue_; i < timestamps.length; i++) {
            if (timestamps[i] >= midnightTime) {
                if (Math.abs(timestamps[i] - midnightTime) < Math.abs(timestamps[i-1] - midnightTime)) {
                    indexes.push(i)
                }
                else {
                    indexes.push(i === 0 ? i : (i - 1))
                }
                continue_ = i + 1
                break
            }
        }
    }

    let values = []
    let dates = []
    for (const i of indexes) {
        dates.push(new Date(data[i][0]))
        values.push(data[i][1])
    }
    const dailyData = [dates, values]

    return dailyData
}

export async function getDailyPrices(startDate, endDate) { 
    if (validateDates([startDate, endDate]) === false) {
        return {"error": "Provide valid dates with YYYY-MM-DD -format!"}
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
    if (validateDates([startDate, endDate]) === false) {
        return {"error": "Provide valid dates with YYYY-MM-DD -format!"}
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
