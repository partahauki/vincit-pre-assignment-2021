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
        const url = "http://localhost:8080/" +
            `${endpoint}?startDate=${startDate}&endDate=${endDate}`

        const resData = await doFetch(url)

        if (resData.error) {
            return resData
        }

        jsonData.push(resData)
    }

    return jsonData
}

export {fetchFromApi}
