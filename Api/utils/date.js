export function validateDateRange(dates) {
    for (const date of dates) {
        if ((/^\d{4}-\d{2}-\d{2}$/).test(date) === false) {
            return { error: "Provide dates in YYYY-MM-DD -format!" }
        }
        if (Number.isNaN(Date.parse(date)) === true) {
            return { error: "Provide valid dates in YYYY-MM-DD -format!" }
        }
    }

    if (Date.parse(dates[0]) > Date.parse(dates[1])) {
        return { error: "Dates must be provided in a chronological order!" }
    }

    if (Date.parse(dates[1]) > Date.parse(new Date())) {
        return { error: "Dates can't be in the future!" }
    }

    return true
}

export function datesToUnixtime(datesParam) {
    const unixtimes = []
    const dates = Array.isArray(datesParam) ? datesParam : [datesParam]

    for (const date of dates) {
        unixtimes.push(Date.parse(date))
    }
    return unixtimes
}
