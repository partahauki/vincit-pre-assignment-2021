import {useState, useEffect} from 'react'
import DateRangeSelector from './DateRangeSelector'
import InfoBox from './InfoBox'


const InfoContainer = () => {
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0,10),)
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0,10))
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    const fetchData = async (start, end) => {
        setIsLoading(true)
        
        const uris = ["A", "B", "C"]
		
		let jsonData = []
		for (const uri of uris) {
			const url = `http://localhost:8080/${uri}?startDate=${start}&endDate=${end}`

			const res = await fetch(url)
            const resData = await res.json()

            if (resData["error"]) {
                setIsLoading(false)
                setData(resData)
                return
            }
            
			jsonData.push(resData)
        }

        setData(jsonData)
        setIsLoading(false)
    }
    
    const getDateRange = (start, end) => {
        setStartDate(start)
        setEndDate(end)
        fetchData(start, end)
    }

    useEffect(() => {
        fetchData(startDate, endDate)
    }, [])

    const returnInfo = () => {
        let print = []

        if (isLoading === true) {
            print.push(<div id="loading">FETCHING DATA...</div>)
        }
        else if (data["error"]) {
            print.push(<InfoBox data={data} type={"error"}/>)
        }
        else {
            print.push(<InfoBox data={data[0]} type="A"/>)
            print.push(<InfoBox data={data[1]} type="B"/>)
            print.push(<InfoBox data={data[2]} type="C"/>)
        }

        return <div className="infoContainer">{print}</div>
    }

    return (
        <div className="contentContainer">
            <DateRangeSelector getDateRange={getDateRange} defaultStartDate={startDate} defaultEndDate={endDate}/>
            { returnInfo() }
        </div>
    )
}

export default InfoContainer
