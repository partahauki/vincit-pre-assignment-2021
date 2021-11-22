import { getDailyPrices, getDailyVolumes } from "./src/fetchGecko.js"
import { highestTradingVolume, longestDownwardTrend } from "./src/analyze.js"
import express from "express"

const app = express()
app.use(express.json())
const port = process.env.PORT || 8080

app.use((req, res, next) => {
    if (!req.query["startDate"] || !req.query["endDate"]) {
        res.json({"error": 
            'You must provide both startDate and endDate parameters! Both must'
            + ' be provided in YYYY-MM-DD -format.'
        })
    }
    else {
        next()
    }
})

app.get('/A', async (req, res) => {   
    const prices = await getDailyPrices(req.query["startDate"], req.query["endDate"])
    //res.json(prices); return
    const results = longestDownwardTrend(prices)
    res.json(results)
})

app.get('/B', async (req, res) => {
    const volumes = await getDailyVolumes(req.query["startDate"], req.query["endDate"])
    //res.json(volumes); return
    const results = highestTradingVolume(volumes)
    res.json(results)
})

app.get('/C', (req, res) => {
    res.send("hello C")
})

app.listen(port, () => {
    console.log("listening port " + port)
})
