import express from "express"
import cors from "cors"
import { getDailyPrices, getDailyVolumes } from "./src/fetchGecko.js"
import { highestTradingVolume, longestDownwardTrend, timeMachine } from "./src/analyze.js"
import { checkQueryParams, validateQueryParams, dateParamsToUnixtime }
    from "./middlewares/queryValidator.js"

const port = 8080
const app = express()
app.use(express.json())

const corsOptions = {
    "origin": "*",
    "methods": "GET"
}
app.use(cors(corsOptions))

app.use(checkQueryParams())
app.use(validateQueryParams())
app.use(dateParamsToUnixtime())

app.get("/downtrend", async (req, res) => {
    const prices = await getDailyPrices(res.locals.startDateUnix, res.locals.endDateUnix)
    if (prices.warning || prices.error) { return res.json(prices) }
    const results = longestDownwardTrend(prices)
    return res.json(results)
})

app.get("/volume", async (req, res) => {
    const volumes = await getDailyVolumes(res.locals.startDateUnix, res.locals.endDateUnix)
    if (volumes.warning || volumes.error) { return res.json(volumes) }
    const results = highestTradingVolume(volumes)
    return res.json(results)
})

app.get("/time-machine", async (req, res) => {
    const prices = await getDailyPrices(res.locals.startDateUnix, res.locals.endDateUnix)
    if (prices.warning || prices.error) { return res.json(prices) }
    const results = timeMachine(prices)
    return res.json(results)
})

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})
