import { useState, useEffect } from 'react'
import DateRangeSelector from './DateRangeSelector'
import InfoBox from './InfoBox'
import { fetchFromApi } from '../api/fetchData'
import { formatDate } from '../utils/date'

const ContentContainer = () => {
    const dateNow = new Date()
    const dateWeekAgo = (new Date()).setDate(dateNow.getDate() - 7)
    
    const [startDate, setStartDate] = useState(formatDate(dateWeekAgo))
    const [endDate, setEndDate] = useState(formatDate(dateNow))
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    const getDateRange = (start, end) => {
        setStartDate(start)
        setEndDate(end)
    }

    useEffect(() => {
        const fetchData = async (start, end) => {
            setIsLoading(true)
            
            const endpoints = ["downtrend", "volume", "time-machine"]
            const jsonData = await fetchFromApi(endpoints, start, end)
            setData(jsonData)

            setIsLoading(false)
        }

        fetchData(startDate, endDate)
    }, [startDate, endDate])

    const returnInfo = () => {
        let return_ = null

        if (isLoading === true || !data) {
            return_ = <div id="loading">FETCHING DATA...</div>
        }
        else if (data["error"]) {
            return_ = <InfoBox data={data} type="error"/>
        }
        else {
            return_ = (
                <>
                    <InfoBox data={data[0]} type="downtrend"/>
                    <InfoBox data={data[1]} type="volume"/>
                    <InfoBox data={data[2]} type="time-machine"/>
                </>
            )
        }

        return <div className="infoContainer">{return_}</div>
    }

    return (
        <div className="contentContainer">
            <DateRangeSelector getDateRange={getDateRange} startDate={startDate} endDate={endDate}/>
            { returnInfo() }
        </div>
    )
}

export default ContentContainer
