const express = require('express')
const app = express()
app.use(express.json())

const port = process.env.PORT || 8080

app.get('/A', (req, res) => {
    res.send("hello A")
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
