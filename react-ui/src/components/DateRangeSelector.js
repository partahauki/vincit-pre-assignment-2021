import PropTypes from "prop-types"
import {formatDate} from "../utils/date"

const DateRangeSelector = ({getDateRange, startDate, endDate}) => {
    return (
        <div className="dateRangeSelector">
            <input type="date" min="1970-01-01" defaultValue={startDate}
                onChange={(event) => startDate = event.target.value} />
            <span>-</span>
            <input type="date" min="1970-01-01" defaultValue={endDate}
                onChange={(event) => endDate = event.target.value} />
            <button className="btn" onClick={() => getDateRange(startDate, endDate)}>Fetch</button>
        </div>
    )
}

DateRangeSelector.defaultProps = {
    defaultStartDate: formatDate(new Date()),
    defaultEndDate: formatDate(new Date()),
}

//  Dates are expected as YYYY-MM-DD -formated strings
DateRangeSelector.propTypes = {
    getDateRange: PropTypes.func.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
}

export default DateRangeSelector
