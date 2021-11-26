const priceFormatting = (price) => {
    let priceParts = price.toFixed(2).toString().split(".")
    priceParts[0] = parseInt(priceParts[0]).toLocaleString("fi-FI")
    priceParts = priceParts.join(".")
    
    return priceParts
}

const InfoBox = ({data, type}) => {
    const print = () => {
        let return_ = []
        if (data["warning"]) { type = "warning" }
        
        switch (type) {
            case "A":
                const streak = <span className="number">{data["maxStreak"]}</span>

                return_.push(<h3>Longest downtrend</h3>)
                return_.push(<div>Longest downtrend was {streak} days</div>)
                return <div className="infoBox">{return_}</div>

            case "B":
                let volume = priceFormatting(data["maxVolume"])
                const volumeSpan = <span className="number">{volume} €</span>
                const dateSpan = <span className="date">{data["date"]}</span>

                return_.push(<h3>Highest trading volume</h3>)
                return_.push(<div>Highest volume was {volumeSpan} on {dateSpan}</div>)
                return <div className="infoBox">{return_}</div>

            case "C":
                const differenceFormatted = priceFormatting(data["maxDifference"])
                const differenceSpan = <span className="number">{differenceFormatted} €</span>
                const buyDateSpan = <span className="date">{data["buyDate"]}</span>
                const sellDateSpan = <span className="date">{data["sellDate"]}</span>

                return_.push(<h3>Time machine</h3>)
                return_.push(<div>Biggest difference in prices was {differenceSpan}<br />
                    Buy on {buyDateSpan} and sell on {sellDateSpan}</div>)
                return <div className="infoBox">{return_}</div>

            case "error":
                return_.push(<h3>Error</h3>)
                return_.push(<div>Error while fetching data: <br /> {data["error"]}</div>)
                return <div className="infoBoxError">{return_}</div>

            case "warning":
                return_.push(<h3>Warning</h3>)
                return_.push(<div>Warning while fetching data: <br /> {data["warning"]}</div>)
                return <div className="infoBoxWarning">{return_}</div>

            default:
                return_.push(<h3>Error</h3>)
                return_.push(<span>Something went wrong.</span>)
                return <div className="infoBoxError">{return_}</div>
        }
    }
    
    return (
        <>{print()}</>
    )

}

export default InfoBox