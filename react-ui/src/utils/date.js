// Formats the date in YYYY-MM-DD -format
const formatDate = (date) => (new Date(date).toISOString().slice(0, 10))
/*
const dateToRegionFormat = (dateParam) => {
    const locale = process.env.
    return dateParam.toLocaleDateString()
}
*/
export {formatDate}// , dateToRegionFormat}
