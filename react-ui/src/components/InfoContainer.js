import {useState, useEffect} from 'react'
import DateRangeSelector from './DateRangeSelector'
import InfoA from './InfoA'
import InfoB from './InfoB'
import InfoC from './InfoC'

const InfoContainer = () => {
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0,10),)
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0,10))
    const [data, setData] = useState([])
    
    const fetchData = async (start, end) => {
		const uris = ["A", "B", "C"]
		
		let jsonData = []
		for (const uri of uris) {
			const url = `http://localhost:8080/${uri}?startDate=${start}&endDate=${end}`

			const res = await fetch(url)
			const resData = await res.json()

			jsonData.push(resData)
        }
        
        console.log("fetching")

		setData(jsonData)
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
        if (data.length === 0) {
            return
        }
        let print = []
        print.push(<InfoA data={data[0]}/>)
        print.push(<InfoB data={data[1]}/>)
        print.push(<InfoC data={data[2]}/>)

    return <>{print}</>
    }

    return (
        <div>
            <DateRangeSelector getDateRange={getDateRange} defaultStartDate={startDate} defaultEndDate={endDate}/>
            { returnInfo() }
        </div>
    )
}

export default InfoContainer
