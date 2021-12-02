const fetch_ = async (url) => {
    try {
        const res = await fetch(url)
        const resData = await res.json()
        return resData
    }
    catch {
        return {"error" : "An error occurred while trying to fetch data from the API"}
    }
}

const fetchFromApi = async (endpoints, startDate, endDate) => {
    let jsonData = []

    for (const endpoint of endpoints) {
        let url = ""
        if (process.env.NODE_ENV === "development") {
            url = "http://localhost:8080/"
        }
        else {
            url = "temp"
        }
        url += `${endpoint}?startDate=${startDate}&endDate=${endDate}`

        const resData = await fetch_(url)

        if (resData["error"]) { return resData }
        
        jsonData.push(resData)
    }

    return jsonData
}

export { fetchFromApi }