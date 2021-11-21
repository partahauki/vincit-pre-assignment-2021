import { fetchRange } from "./src/fetchGecko.js"
import express from "express"

const app = express()
app.use(express.json())
const port = process.env.PORT || 8080

app.get('/A', async (req, res) => {
    if (!req.query["startDate"] || !req.query["endDate"]) {
        res.json({"error": 
            'You must provide both startDate and endDate parameters! Both must'
            + ' be provided in YYYY-MM-DD -format.'
        })
    }
    else {
        const results = await fetchRange(req.query["startDate"], req.query["endDate"])
        res.json(results)
    }
})

app.get('/B', (req, res) => {
    res.send("hello B")
})

app.get('/C', (req, res) => {
    res.send("hello C")
})

app.listen(port, () => {
    console.log("listening port " + port)
})
