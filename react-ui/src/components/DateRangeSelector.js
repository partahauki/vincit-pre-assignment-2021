
const DateRangeSelector = ({getDateRange, defaultStartDate, defaultEndDate}) => {
    let startDate = defaultStartDate
    let endDate = defaultEndDate
    
    return (
        <div className="dateRangeSelector">
            <input type="date" min="1970-01-01" defaultValue={defaultStartDate} onChange={event => startDate = event.target.value}/>
            <span>-</span>
            <input type="date" min="1970-01-01" defaultValue={defaultEndDate} onChange={event => endDate = event.target.value}/>
            <button className="btn" onClick={() => getDateRange(startDate, endDate)}>Fetch</button>
        </div>
    )
}

DateRangeSelector.defaultProps = { 
    defaultStartDate : new Date().toISOString().slice(0,10),
    defaultEndDate : new Date().toISOString().slice(0,10)
}

export default DateRangeSelector
