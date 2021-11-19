import fetch from 'node-fetch'

function isInteger(value) {
    return /^\d+$/.test(value)
}

function validateDates(dates) {
    for (const date of dates) {
        if (isInteger(date) === false && isNaN(Date.parse(date)) === true)
            return false
    }

    return true
}

function formatDates(dates) {
    for (const key in dates) {
        if (isInteger(dates[key]) === false)
            dates[key] = Date.parse(dates[key]) / 1000
    }

    return dates
}

export async function fetchRange(startDate, endDate) { 
    if (validateDates([startDate, endDate]) === false) 
        return {"error": "Invalid date formating. Use either unix timestamps "
            + "or YYYY-MM-DD -format!"}
    
    const [start, end] = formatDates([startDate, endDate])

    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/`
        + `range?vs_currency=eur&from=${start}&to=${end}`

    const response = await fetch(url)
    const results = await response.json()

    return results
}