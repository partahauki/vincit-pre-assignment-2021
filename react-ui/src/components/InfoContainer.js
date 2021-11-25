import {useState, useEffect} from 'react'
import DateRangeSelector from './DateRangeSelector'
import {InfoBoxA, InfoBoxB, InfoBoxC} from './InfoBoxes'


const InfoContainer = () => {
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0,10),)
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0,10))
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const fetchData = async (start, end) => {
        setIsLoading(true)
        
        const uris = ["A", "B", "C"]
		
		let jsonData = []
		for (const uri of uris) {
			const url = `http://localhost:8080/${uri}?startDate=${start}&endDate=${end}`

			const res = await fetch(url)
			const resData = await res.json()

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
        console.log("startDate = " + startDate)
        console.log("endDate = " + endDate)
        console.log(data)
    })

    useEffect(() => {
        console.log("Init fetch")
        fetchData(startDate, endDate)
    }, [])

    const returnInfo = () => {
        if (isLoading === true) {
            return <div id="loading">FETCHING DATA...</div>
        }
        else if (data.length === 0) {
            return
        }
        
        let print = []
        print.push(<InfoBoxA data={data[0]}/>)
        print.push(<InfoBoxB data={data[1]}/>)
        print.push(<InfoBoxC data={data[2]}/>)

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
