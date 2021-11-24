
const DateRangeSelector = ({getDateRange, defaultStartDate, defaultEndDate}) => {
    let startDate = defaultStartDate
    let endDate = defaultEndDate
    
    return (
        <div>
            <input type="date" min="1970-01-01" defaultValue={defaultStartDate} onChange={event => startDate = event.target.value}/>
            <input type="date" min="1970-01-01" defaultValue={defaultEndDate} onChange={event => endDate = event.target.value}/>
            <button onClick={() => getDateRange(startDate, endDate)}>GET</button>
        </div>
    )
}

DateRangeSelector.defaultProps = { 
    defaultStartDate : new Date().toISOString().slice(0,10),
    defaultEndDate : new Date().toISOString().slice(0,10)
}

export default DateRangeSelector
