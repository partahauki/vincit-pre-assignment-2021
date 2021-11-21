import fetch from 'node-fetch'

function validateDates(dates) {
    for (const date of dates) {
        if (isNaN(Date.parse(date)) === true) {
            return false
        }
    }

    return true
}

export async function fetchRange(startDate, endDate) { 
    if (validateDates([startDate, endDate]) === false) {
        return {"error": "Provide valid dates with YYYY-MM-DD -format!"}
    }
    
    const unixtimeHour = 3600000
    const startUnixtime = Date.parse(startDate)
    const endUnixtime = Date.parse(endDate) + unixtimeHour

    let results = null
    try{
        const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/`
        + `range?vs_currency=eur&from=${(startUnixtime / 1000)}&to=${endUnixtime / 1000}`

        const response = await fetch(url)
        results = await response.json()
    }
    catch (e) {
        console.error(e)
        return {"error" : "An error occured while server was fetching data."}
    }

    if (results["prices"].length === 0) {
        return {"error": `No prices were found for date range ${startDate} - ${endDate}`} 
    }

    let timestamps = []
    for(const log of results["prices"]) {
        timestamps.push(log[0])
    }

    const unixtimeDay = 86400000   

    let indexes = []
    let continue_ = 0
    for (let midnightTime = startUnixtime; midnightTime < endUnixtime; midnightTime += unixtimeDay) { 
        for (let i = continue_; i < timestamps.length; i++) {
            if (timestamps[i] > midnightTime) {
                continue_ = i
                indexes.push(continue_)
                break
            }
        }
    }

    let dailyPrices = []
    for (const index of indexes) {
        const date = new Date(results["prices"][index][0])
        const price = results["prices"][index][1]
        dailyPrices.push({"date" : date, "price" : price})
    }  
    
    return results
}


    // let indeksit = []
    // let continu = 0
    // for (let estimate = startUnixtime; estimate < endUnixtime; estimate += unixtimeDay) {
    //     console.log(continu)
    //     const estima = new Date(estimate)
    //     console.error(estima)
    //     const sliced = timestamps.slice(continu)
    //     for (const [i, v] of sliced.entries()) {
    //         if (sliced[i] > estimate) {
    //             let paiva = new Date(v)
    //             console.log(paiva)
    //             console.log("----------------------")         
    //             continu += i
    //             indeksit.push(continu)
    //             break
    //         }
    //     }
    // }


    // console.time('reduce')
    // let array = []
    // for (let midnightTime = startUnixtime; midnightTime < endUnixtime; midnightTime += unixtimeDay) {
    //     const output = timestamps.reduce((prev, curr, i) => {
    //         return (Math.abs(curr - midnightTime) < Math.abs(prev - midnightTime) ? curr : prev) 
    //     })
    //     array.push(output)
    // }
    // console.timeEnd('reduce')