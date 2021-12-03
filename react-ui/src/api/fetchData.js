const doFetch = async (url) => {
    try {
        const res = await fetch(url)
        const resData = await res.json()
        return resData
    } catch {
        return {error: "An error occurred while trying to fetch data from the API"}
    }
}

const fetchFromApi = async (endpoints, startDate, endDate) => {
    const jsonData = []

    for (const endpoint of endpoints) {
        let url = ""
        if (process.env.NODE_ENV === "development") {
            url = "http://localhost:8080/"
        } else {
            url = "https://pre-assignment-api.azurewebsites.net/"
        }
        url += `${endpoint}?startDate=${startDate}&endDate=${endDate}`

        const resData = await doFetch(url)

        if (resData.error) {
            return resData
        }

        jsonData.push(resData)
    }

    return jsonData
}

export {fetchFromApi}
