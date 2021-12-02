import { validateDateRange } from "../utils/date.js"

export function checkQueryParams() {
    return (req, res, next) => {
        if (!req.query.startDate || !req.query.endDate) {
            res.json({
                error:
                "You must provide both startDate and endDate parameters! Both must"
                + " be provided in YYYY-MM-DD -format.",
            })
        } else { next() }
    }
}

export function validateQueryParams() {
    return (req, res, next) => {
        const validation = validateDateRange([req.query.startDate, req.query.endDate])
        if (validation !== true) { res.json(validation); return }
        next()
    }
}

export function dateParamsToUnixtime() {
    return (req, res, next) => {
        res.locals.startDateUnix = Date.parse(req.query.startDate)
        res.locals.endDateUnix = Date.parse(req.query.endDate)
        next()
    }
}
