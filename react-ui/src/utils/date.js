//Formats the date in YYYY-MM-DD -format
const formatDate = (date) => {
    return (new Date(date).toISOString().slice(0,10))
}

export {formatDate}